import React, { useEffect, Component } from "react";
import Header from "../components/Header";
import { render } from "react-dom";
import axios from "axios";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      orders: [],
      viewToggle: false,
      viewToggleId: ""
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/product-orders/orders-by-one-user",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          orders: res.data
        });
      }
      console.log(res);
    });
  }

  cancelOrder = id => {
    let requestOptions = {
      method: "DELETE",
      url: "http://localhost:5000/api/product-orders/delete-order",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id: id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Order has been successfully cancelled");
        location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };

  viewToggle = id => {
    this.setState({
      viewToggle: !this.state.viewToggle,
      viewToggleId: id
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container>
          {this.state.orders ? (
            <div>
              {this.state.orders.map(order => (
                <Container>
                  <h3>{order.product_name}</h3>
                  {order.product_image ? <img src={require(`../../public/${order.product_image}`)} className="img" /> : <img src={require(`../../public/no-image.jpg`)} className="img" />}
                  <p>
                    <strong>Status: {order.status}</strong>
                  </p>
                  <button onClick={() => this.viewToggle(order._id)} className="btn btn-info mr-2">
                    View Details
                  </button>
                  {order.status != "Delivered" ? (
                    <button onClick={() => this.cancelOrder(order._id)} className="btn btn-danger">
                      Cancel order
                    </button>
                  ) : (
                    ""
                  )}
                  {this.state.viewToggle === true ? (
                    <div className="mt-3">
                      <p>{order.product_description}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </Container>
              ))}
            </div>
          ) : (
            <h3>Something went wrong. Couldn't get the response</h3>
          )}
        </Container>
      </div>
    );
  }
}

export default MyOrders;

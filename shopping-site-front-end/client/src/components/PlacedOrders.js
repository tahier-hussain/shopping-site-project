import React, { useEffect, Component } from "react";
import Header from "../components/Header";
import { render } from "react-dom";
import axios from "axios";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

class PlacedOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      orderToBeDelivered: [],
      updateStatusToggle: false,
      updateStatusId: "",
      status: "",
      viewDetailsToggle: false,
      viewDetailsToggleId: ""
    };
  }

  async componentDidMount() {
    if (this.state.userDetails.type === "admin") {
      let requestOptions = {
        method: "GET",
        url: "http://localhost:5000/api/product-orders/orders-to-be-delivered"
      };

      await axios(requestOptions).then(res => {
        this.setState({
          orderToBeDelivered: res.data
        });
        console.log(this.state.orderToBeDelivered);
      });
    }
  }

  updateStatusToggle = id => {
    this.setState({
      updateStatusToggle: !this.state.updateStatusToggle,
      updateStatusId: id
    });
  };

  changeHandler = () => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  updateStatus = e => {
    e.preventDefault();
    console.log("HELLO");
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/product-orders/update-status",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id: this.state.updateStatusId,
        status: this.state.status
      }
    };

    console.log(requestOptions);

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Status updated successfully");
        location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };

  viewDetailsToggle = id => {
    this.setState({
      viewDetailsToggle: !this.state.viewDetailsToggle,
      viewDetailsToggleId: id
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container>
          {this.state.userDetails.type === "admin" ? (
            <div>
              {this.state.orderToBeDelivered.map(order => (
                <Container className="border mt-3 mb-3">
                  <h3 className="mt-2 mb-2">{order.product_name}</h3>
                  {order.product_image ? <img src={require(`../../public/${order.product_image}`)} className="img" /> : <img src={require(`../../public/no-image.jpg`)} className="img" />}
                  <p>
                    <strong>Status: {order.status}</strong>
                  </p>
                  <p className="mt-2">
                    <button onClick={() => this.viewDetailsToggle(order._id)} className="btn btn-info">
                      View Details
                    </button>
                    <button className="btn btn-primary ml-2" onClick={() => this.updateStatusToggle(order._id)}>
                      Update Status
                    </button>
                  </p>
                  {this.state.viewDetailsToggle === true && this.state.viewDetailsToggleId === order._id ? <p className="mt-2 mb-2">{order.product_description}</p> : ""}
                  {this.state.updateStatusToggle === true && order._id === this.state.updateStatusId ? (
                    <Form className="mt-4 mb-4" onSubmit={this.updateStatus}>
                      <Col>
                        <h2>Update Status</h2>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="exampleSelect">Choose status</Label>
                          <Input type="select" name="status" id="exampleSelectMulti" onChange={this.changeHandler}>
                            <option>Order Received</option>
                            <option>Item packed</option>
                            <option>Item Shipped</option>
                            <option>Delivery executive has picked up your order</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col>
                        <Button color="dark">Update Status</Button>
                      </Col>
                      <Col>
                        <Button onClick={this.updateStatusToggle} className="btn btn-danger mt-2">
                          Close
                        </Button>
                      </Col>
                    </Form>
                  ) : (
                    ""
                  )}
                </Container>
              ))}
            </div>
          ) : (
            ""
          )}
        </Container>
      </div>
    );
  }
}

export default PlacedOrders;

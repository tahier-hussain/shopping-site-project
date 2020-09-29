import React, { useEffect, Component } from "react";
import Header from "../components/Header";
import { render } from "react-dom";
import axios from "axios";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      MyCartData: [],
      error_message: "",
      buyProductToggle: false,
      buyProductToggleId: "",
      no_of_items: "",
      product_title: ""
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/cart/get-user-cart",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          MyCartData: res.data
        });
      } else {
        this.setState({
          error_message: res.data.msg
        });
      }
      console.log(res);
    });
  }

  removeFromCart = id => {
    let requestOptions = {
      method: "DELETE",
      url: "http://localhost:5000/api/cart/delete-cart-item",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      },
      data: {
        id: id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };

  buyProduct = (id, cart_id) => {
    let requestOptions = {
      method: "DELETE",
      url: "http://localhost:5000/api/cart/delete-cart-item",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      },
      data: {
        id: id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Order received");
        this.removeFromCart();
      } else {
        alert("Something went wrong");
      }
    });
  };

  buyProductToggle = id => {
    this.setState({
      buyProductToggle: !this.state.buyProductToggle,
      buyProductToggleId: id
    });
  };

  ProductSubmitHandler = product_id => {
    const requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/product-orders/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        product: product_id,
        no_of_items: this.state.no_of_items
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Order placed successfully");
      } else {
        alert("Something went wrong");
      }
    });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container>
          {this.state.MyCartData.length > 0 ? (
            <div>
              {this.state.MyCartData.map(cart => (
                <div>
                  {cart.product_title ? (
                    <Container>
                      <h3>{cart.product_title}</h3>
                      {cart.product_image ? <img src={require(`../../public/${cart.product_image}`)} className="img" /> : <img src={require(`../../public/no-image.jpg`)} className="img" />}
                      <p></p>
                      <button className="btn btn-info mr-2">View Product</button>
                      <button onClick={() => this.removeFromCart(cart._id)} className="btn btn-danger mr-2">
                        Remove from cart
                      </button>
                      <button onClick={() => this.buyProductToggle(cart._id)} className="btn btn-success mr-2">
                        Buy Now
                      </button>
                      {this.state.buyProductToggle === true && this.state.buyProductToggleId === cart._id ? (
                        <Form className="mt-4 mb-4" onSubmit={() => this.ProductSubmitHandler(cart.product)}>
                          <Col>
                            <h2>Buy this Product</h2>
                          </Col>
                          <Col>
                            <FormGroup>
                              <Label>No of Items</Label>
                              <Input type="number" name="no_of_items" id="name" placeholder="no of items" onChange={this.changeHandler} />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <Label>Address</Label>
                              <Input type="textarea" name="product_title" id="name" placeholder="product name" />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <Label>Landmark</Label>
                              <Input type="text" name="product_title" id="name" placeholder="product name" />
                            </FormGroup>
                          </Col>
                          <Col>
                            <Button color="dark">Buy Product</Button>
                          </Col>
                          <Col>
                            <Button onClick={this.buyProductToggle(cart._id)} className="btn btn-danger mt-2">
                              Close
                            </Button>
                          </Col>
                        </Form>
                      ) : (
                        ""
                      )}
                    </Container>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Container>{this.state.error_message}</Container>
          )}
        </Container>
      </div>
    );
  }
}

export default MyCart;

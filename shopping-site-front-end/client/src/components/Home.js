import React, { useEffect, Component } from "react";
import Header from "../components/Header";
import { render } from "react-dom";
import axios from "axios";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      createProductToggle: false,
      createCategoryToggle: false,
      product_title: "",
      product_description: "",
      category_id: "",
      categories: [],
      category_name: ""
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/category/get"
    };

    axios(requestOptions).then(res => {
      this.setState({
        categories: res.data,
        category_id: res.data[0].category_name
      });
      console.log(res.data);
    });
  }

  // createProductToggle = () => {
  //   this.setState({
  //     createProductToggle: !this.state.createProductToggle
  //   });
  // };

  createCategoryToggle = () => {
    this.setState({
      createCategoryToggle: !this.state.createCategoryToggle
    });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // submitHandler = event => {
  //   event.preventDefault();
  //   if (this.state.category_id.length === 0) {
  //     this.setState({
  //       category_id: this.state.categories[0].category_name
  //     });
  //   }
  //   for (var i = 0; i < this.state.categories.length; i++) {
  //     if (this.state.categories[i].category_name === this.state.category_id) {
  //       this.setState({
  //         category_id: this.state.categories[i]._id
  //       });
  //       break;
  //     }
  //   }

  //   const requestOptions = {
  //     method: "POST",
  //     url: "http://localhost:5000/api/product/add",
  //     headers: {
  //       "x-auth-token": localStorage.getItem("auth-token"),
  //       "Content-Type": "application/json"
  //     },
  //     data: {
  //       product_title: this.state.product_title,
  //       product_description: this.state.product_description,
  //       category_id: this.state.category_id
  //     }
  //   };

  //   axios(requestOptions).then(res => {
  //     if (res.status === 200) {
  //       alert("Product added successfully");
  //       location.reload();
  //     } else {
  //       alert("Something went wrong");
  //     }
  //   });
  // };

  submitHandlerForCategory = () => {
    const requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/category/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        category_name: this.state.category_name
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Category added successfully");
        location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container>
          <h2>This is the Latest Shopping Site</h2>
          {this.state.userDetails.type === "admin" ? (
            <div>
              <h4>This is the Admin's home page. The admin has the access to add, edit and delete the products. And the admin can also update the status of the products that have been ordered by our customers</h4>
              <div>
                <a className="mt-3 btn btn-success" href="/placed-orders">
                  {" "}
                  Placed Orders{" "}
                </a>
              </div>
              {/* <button className="btn btn-primary mr-2 mt-3 mb-5" onClick={this.createProductToggle}>
                Create new product
              </button> */}
              <button className="btn btn-primary mr-2 mt-3 mb-5" onClick={this.createCategoryToggle}>
                Create new Category
              </button>
              <a className="btn btn-primary mr-2 mt-3 mb-5" href="/products">
                View all Products
              </a>
              <a className="btn btn-primary mr-2 mt-3 mb-5" href="/categories">
                View all Categories
              </a>
              {this.state.createCategoryToggle === true ? (
                <Form className="mt-4 mb-4" onSubmit={this.submitHandlerForCategory}>
                  <Col>
                    <h2>Create Category</h2>
                  </Col>
                  {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
                  <Col>
                    <FormGroup>
                      <Label>Product Name</Label>
                      <Input type="text" name="category_name" id="name" placeholder="category name" onChange={this.changeHandler} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <Button color="dark">Create Category</Button>
                  </Col>
                  <Col>
                    <Button onClick={this.createCategoryToggle} className="btn btn-danger mt-2">
                      Close
                    </Button>
                  </Col>
                </Form>
              ) : (
                ""
              )}
              {/* {this.state.createProductToggle === true ? (
                <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
                  <Col>
                    <h2>Create Product</h2>
                  </Col>
                  {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
                  <Col>
                    <FormGroup>
                      <Label>Product Name</Label>
                      <Input type="text" name="product_title" id="name" placeholder="product name" onChange={this.changeHandler} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Product Description</Label>
                      <Input type="textarea" name="product_description" id="exampleEmail" placeholder="product description" onChange={this.changeHandler} />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="exampleSelect">Select Category</Label>
                      <Input type="select" name="category_id" id="exampleSelectMulti" onChange={this.changeHandler}>
                        {this.state.categories.map(category => (
                          <option>{category.category_name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <Button color="dark">Create Product</Button>
                  </Col>
                  <Col>
                    <Button onClick={this.createProductToggle} className="btn btn-danger mt-2">
                      Close
                    </Button>
                  </Col>
                </Form>
              ) : (
                ""
              )} */}
            </div>
          ) : (
            <div>
              <h4>This is the Customer's page. The customer will be able to add new products to their cart, buy new products and track their orders</h4>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default Home;

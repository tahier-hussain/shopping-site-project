import React, { useEffect, Component } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Container, Col, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Button, Alert } from "reactstrap";
import Category from "./Category";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      products: [],
      toggle: false,
      dropdownOpen: false,
      categories: [],
      product_title: "",
      product_description: "",
      category_id: "",
      buyProductToggle: false,
      no_of_items: "",
      toggle_id: "",
      product_image: "",
      file: {},
      viewProductDescriptionToggle: false,
      viewProductDescriptionToggleId: ""
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/product/get"
    };

    axios(requestOptions).then(res => {
      this.setState({
        products: res.data
      });
      console.log(res.data);
    });

    requestOptions = {
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

  deleteProduct = id => {
    let requestOptions = {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      url: "http://localhost:5000/api/product/delete-product",
      data: {
        id: id
      }
    };

    axios(requestOptions)
      .then(res => {
        alert("Item deleted successfully");
        location.reload();
      })
      .catch(err => console.log(err));
  };

  createProduct = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  setDropdownOpen = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  submitHandler = event => {
    event.preventDefault();
    if (this.state.category_id.length === 0) {
      this.setState({
        category_id: this.state.categories[0].category_name
      });
    }
    for (var i = 0; i < this.state.categories.length; i++) {
      if (this.state.categories[i].category_name === this.state.category_id) {
        this.setState({
          category_id: this.state.categories[i]._id
        });
        break;
      }
    }

    const requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/product/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        product_title: this.state.product_title,
        product_description: this.state.product_description,
        category_id: this.state.category_id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Product added successfully");
      } else {
        alert("Something went wrong");
      }
    });
  };

  buyProductToggle = id => {
    this.setState({
      buyProductToggle: !this.state.buyProductToggle,
      toggle_id: id
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

  addToCart = product_id => {
    const requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/cart/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        product: product_id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Item added to cart");
      } else {
        alert("Something went wrong");
      }
    });
  };

  changeHandlerForFile = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  submitHandlerForFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("product_title", this.state.product_title);
    formData.append("product_description", this.state.product_description);
    formData.append("category_id", this.state.category_id);

    let requestOptions = {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "multipart/form-data"
      },
      url: "http://localhost:5000/api/product/add",
      data: formData
    };

    console.log(this.state.file);

    axios(requestOptions)
      .then(res => {
        if (res.status === 200) {
          alert("Product added successfully");
        } else {
          alert("Something went wrong");
        }
      })
      .catch(err => console.log(err));
  };

  viewProductDescriptionToggle = id => {
    this.setState({
      viewProductDescriptionToggle: !this.state.viewProductDescriptionToggle,
      viewProductDescriptionToggleId: id
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container>
          <h1 className="mb-5">Welcome {this.state.userDetails.name}</h1>
          <h2>Products</h2>
          {this.state.userDetails.type === "admin" ? (
            <button className="btn btn-primary" onClick={this.createProduct}>
              Create New Product
            </button>
          ) : (
            ""
          )}
          {this.state.toggle ? (
            <Form className="mt-4 mb-4" onSubmit={this.submitHandlerForFile}>
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
                  <Label>Upload Image</Label>
                  <Input type="file" name="file" id="exampleEmail" placeholder="product image" onChange={this.changeHandlerForFile} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="exampleSelect">Select Category</Label>
                  <Input type="select" name="category_id" id="exampleSelectMulti" onChange={this.changeHandlerForFile}>
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
                <Button onClick={this.createProduct} className="btn btn-danger mt-2">
                  Close
                </Button>
              </Col>
            </Form>
          ) : (
            ""
          )}
          {this.state.products.map(product => (
            <Container className="border mt-3 mb-3">
              <h3 className="mt-2">{product.product_title}</h3>
              <div>
                {product.filename ? <img src={require(`../../public/${product.filename}`)} className=".img-fluid img" /> : <img src={require(`../../public/no-image.jpg`)} />}
                {this.state.viewProductDescriptionToggle === true && this.state.viewProductDescriptionToggleId === product._id ? <p className="img-text">{product.product_description}</p> : ""}
              </div>
              {this.state.userDetails.type === "admin" ? (
                <div className="mb-3">
                  <button className="btn btn-info mr-2" onClick={() => this.viewProductDescriptionToggle(product._id)}>
                    View Detail
                  </button>
                  <button className="btn btn-primary" onClick={() => this.editProduct(product._id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger ml-3" onClick={() => this.deleteProduct(product._id)}>
                    Delete
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  <button className="btn btn-info mr-2" onClick={() => this.viewProductDescriptionToggle(product._id)}>
                    View Detail
                  </button>
                  <button className="btn btn-success" onClick={() => this.buyProductToggle(product._id)}>
                    Buy Now
                  </button>
                  <button className="btn btn-primary ml-2" onClick={() => this.addToCart(product._id)}>
                    Add to Cart
                  </button>
                  {this.state.buyProductToggle === true && this.state.toggle_id === product._id ? (
                    <Form className="mt-4 mb-4" onSubmit={() => this.ProductSubmitHandler(product._id)}>
                      <Col>
                        <h2>Buy this Product</h2>
                      </Col>
                      {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
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
                        <Button onClick={this.buyProductToggle} className="btn btn-danger mt-2">
                          Close
                        </Button>
                      </Col>
                    </Form>
                  ) : (
                    ""
                  )}{" "}
                </div>
              )}
            </Container>
          ))}
        </Container>
      </div>
    );
  }
}

export default Product;

import React, { Component } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Container, Col, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Button } from "reactstrap";

class SingleCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      category_id: props.category_name,
      userDetails: JSON.parse(localStorage.getItem("user-details"))
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      url: "http://localhost:5000/api/product/get-category-products",
      data: JSON.stringify({ category_id: this.state.category_id })
    };

    console.log(requestOptions);

    axios(requestOptions).then(res => {
      this.setState({
        products: res.data
      });
      console.log(res);
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
        console.log("Item deleted successfully");
        location.reload();
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <Container>
          <h1 className="mb-5">Welcome {this.state.userDetails.name}</h1>
          <h2>Products of {this.props.category_name}</h2>
          {this.state.products.map(product => (
            <Container className="border mt-3 mb-3">
              <h4 className="mt-2">{product.product_title}</h4>
              <p>{product.product_description}</p>
              {this.state.userDetails.type === "admin" ? (
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={() => this.editProduct(product._id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger ml-3" onClick={() => this.deleteProduct(product._id)}>
                    Delete
                  </button>
                </div>
              ) : (
                ""
              )}
            </Container>
          ))}
          <Button href="/categories">Go Back</Button>
        </Container>
      </div>
    );
  }
}

export default SingleCategory;

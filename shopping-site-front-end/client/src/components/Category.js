import React, { useEffect, Component } from "react";
import axios from "axios";
import Header from "../components/Header";
import SingleCategory from "../components/SingleCategory";
import { Container, Col, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Button } from "reactstrap";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      categories: [],
      toggle: false,
      category_id: "",
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
        categories: res.data
      });
      console.log(res.data);
    });
  }

  deleteCategory = id => {
    let requestOptions = {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      url: "http://localhost:5000/api/category/delete-category",
      data: {
        id: id
      }
    };

    axios(requestOptions)
      .then(res => {
        alert("Category Deleted successfully");
        location.reload();
      })
      .catch(err => console.log(err));
  };

  singleCategoryProducts = (id, name) => {
    this.setState({
      category_id: id,
      category_name: name,
      toggle: !this.state.toggle
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container>
          {this.state.toggle === false ? (
            <div>
              <h1 className="mb-5">Welcome {this.state.userDetails.name}</h1>
              <h2>Categories</h2>
              {this.state.categories.map(category => (
                <Container className="border mt-3 mb-3">
                  <h4 className="mt-2">{category.category_name}</h4>
                  <Button color="dark" className="mb-2 mt-2" onClick={() => this.singleCategoryProducts(category._id, category.category_name)}>
                    See products
                  </Button>
                  {this.state.userDetails.type === "admin" ? (
                    <div className="mb-3">
                      <button className="btn btn-primary">Edit</button>
                      <button onClick={() => this.deleteCategory(category._id)} className="btn btn-danger ml-3">
                        Delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </Container>
              ))}
            </div>
          ) : (
            <SingleCategory category_name={this.state.category_name} />
          )}
        </Container>
      </div>
    );
  }
}

export default Category;

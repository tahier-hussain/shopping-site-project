import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error_message: ""
    };
  }
  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    var url = "";
    if (this.state.userLogin == true) {
      url = "http://localhost:5000/api/login";
    } else {
      url = "http://localhost:5000/api/admin-login";
    }
    const requestOptions = {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email: this.state.email,
        password: this.state.password
      }
    };

    axios(requestOptions).then(res => {
      if (res.data.status == 200) {
        console.log(this.state.LoggedIn);
        if (res.data.admin) {
          localStorage.setItem("user-details", JSON.stringify(res.data.admin));
        } else {
          localStorage.setItem("user-details", JSON.stringify(res.data.users));
        }
        localStorage.setItem("auth-token", res.data.token);
        this.props.history.push("/home");
      } else if (res.data.status == 400) {
        this.setState({
          error_message: res.data.msg
        });
      }
    });
  };

  toggle = () => {
    this.setState({
      userLogin: !this.state.userLogin
    });
  };
  render() {
    return (
      <div>
        <Header />
        <Container className="border">
          <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
            <Col>{this.state.userLogin === true ? <h2>User LogIn</h2> : <h2>Admin Login</h2>}</Col>
            {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" size="5" name="email" id="exampleEmail" placeholder="myemail@email.com" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="********" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <Button color="dark">Login</Button>
            </Col>
            <Col>
              Don't have an account?
              <Button color="link">
                <Link to="/register">Register</Link>
              </Button>
            </Col>
            <Col>
              {this.state.userLogin === true ? (
                <div>
                  Not a User?
                  <Button color="link">
                    <Link onClick={this.toggle}>Login as Admin</Link>
                  </Button>
                </div>
              ) : (
                <div>
                  Not an Admin ?
                  <Button color="link">
                    <Link onClick={this.toggle}>Login as User</Link>
                  </Button>
                </div>
              )}
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;

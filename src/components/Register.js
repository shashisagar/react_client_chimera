import React from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';


class Register extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  };
  handleChange = event => {
      const { name, value } = event.target  //Destructure the current fields name and value
      this.setState({ [name]: value });  //Sets state
  };
  handleSubmit = event => {
      event.preventDefault();
      //Alter your Axios request like below
      const userObject = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
      }
      axios.post('http://127.0.0.1:8080/api/users', userObject)
      .then((response) => {
          setUserSession(response.data.token, response.data.user);
          console.log(response.data)
      }).catch((error) => {
          console.log(error)
      });
  }   
  render() {
    return (
      <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" name="firstName" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" name="lastName" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone Number" name="phone" onChange={this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
      </div>
    );
  } 
}

export default Register;
import React from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import {setUserSession } from '../Utils/Common';
import {browserHistory} from 'react-router';

class Register extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    invalid_auth : '',
    register_message : ''
  };

  handleChange = event => {
      const { name, value } = event.target; 
      this.setState({ [name]: value });
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
          this.setState({register_message : 'User registered successfully!!,please login '});
          this.setState({invalid_auth: ''});
          browserHistory.push('/login');
          setTimeout(function(){ window.location.reload(false) }, 500);
        }).catch((error) => {
        let invalid_auth  = this.state.invalid_auth;
        invalid_auth = error.response.data; 
        this.setState({register_message: ''});
        this.setState({invalid_auth});
        return false;
      });
  }   
  render() {
    return (
      <div>
          <span className='error' style={{color: "red"}}>{this.state.register_message !=='' && this.state.register_message}</span>
          <span className='error' style={{color: "red"}}>{this.state.invalid_auth !=='' && this.state.invalid_auth}</span>

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
import React from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleChange = event => {
      const { name, value } = event.target
      this.setState({ [name]: value });
  };
  handleSubmit = event => {
      event.preventDefault();
      const userObject = {
        email: this.state.email,
        password: this.state.password,
      }
      axios.post('http://localhost:8080/api/auth', userObject)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        this.props.history.push('/dashboard');
      }).catch((error) => {
          return false;
      });
  }  
  render() {
    return (
    <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
    </div>);
  } 
}

export default Login;
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
      const { name, value } = event.target  //Destructure the current fields name and value
      this.setState({ [name]: value });  //Sets state
  };
  handleSubmit = event => {
      event.preventDefault();
      //Alter your Axios request like below
      const userObject = {
        email: this.state.email,
        password: this.state.password,
      }
      axios.post('http://127.0.0.1:8080/auth/login', userObject)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        this.props.history.push('/dashboard');
      }).catch((error) => {
          console.log(error)
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
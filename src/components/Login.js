import React from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import {setUserSession } from '../Utils/Common';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email : '',
        password : '',
      },
      invalid_auth : '',
    };
  }
 
  handleChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'email': 
        if(value.length < 1) {
          errors.email = 'Email required!'
        } else {
          errors.email = value
        }
        break;
      case 'password': 
        if(value.length < 1) {
          errors.password = 'Password required!'
        } else {
          errors.password = value
        }
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
};
handleSubmit = event => {
    event.preventDefault();
    // if(this.validateForm(this.state.errors)) {
      const userObject = {
        email: this.state.email,
        password: this.state.password,
      }
      axios.post('http://localhost:8080/api/auth', userObject)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
          this.props.history.push('/chat-windows');
          setTimeout(function(){ window.location.reload(false) }, 500);
        }).catch((error) => {
          let invalid_auth  = this.state.invalid_auth;
          invalid_auth = error.response.data; 
          this.setState({invalid_auth});
          return false;
  });
} 
//     else {
//       console.error('Invalid Form')
//     }
// } 

validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(function(element){
    if(element === ''){
      valid = false;
    }
  });
  return valid;
};

  render() {
      return (
        <div>
            <span className='error' style={{color: "red"}}>{this.state.invalid_auth !=='' && this.state.invalid_auth}</span>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  {/* <span className='error' style={{color: "red"}}>{this.state.email == '' && this.state.errors.email}</span> */}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                  {/* <span className='error' style={{color: "red"}}>{this.state.password == '' && this.state.errors.password}</span> */}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>
        </div>);
  } 
}

export default Login;
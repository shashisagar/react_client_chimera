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
    this.setState({ errors, [name]: value });
  };
handleSubmit = event => {
    event.preventDefault();
    let errors = this.state.errors;
    let data = this.state;

    if(data.email==''){
      errors.email = 'Email required!'
    } else {
      errors.email = ''
    }
    if(data.password == ''){
      errors.password = 'Password required!'
    } else {
      errors.password = ''
    }
    this.setState({ errors });

    if(this.state.errors.email === '' && this.state.errors.password === '') {
        const userObject = {
          email: this.state.email,
          password: this.state.password,
        }
        axios.post('http://localhost:8080/api/auth', userObject)
        .then((response) => {
          setUserSession(response.data.token, response.data.user);
            this.props.history.push('/chat-windows');
            setTimeout(function(){ window.location.reload(false) }, 100);
          }).catch((error) => {
            let invalid_auth  = this.state.errors.email;
            invalid_auth = error.response.data; 
            if(invalid_auth === 'Invalid email or password.') {
              this.setState({invalid_auth: invalid_auth});
            } else {
              this.setState({invalid_auth: ''});
            }
            return false;
      });
    } 
    else {
        console.log('Invalid form');
    }
} 

  render() {
      return (
        <div style={{margin: '209px',
          marginTop: '20px'}}>

            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <span className='error' style={{color: "red"}}>{this.state.invalid_auth !=='' && this.state.invalid_auth}</span>
                  <span className='error' style={{color: "red"}}>{this.state.errors.email}</span>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                  <span className='error' style={{color: "red"}}>{this.state.errors.password}</span>
                </Form.Group>
                <Button style={{background: '#3e3434'}} type="submit">
                  Submit
                </Button>
            </Form>
        </div>);
  } 
}

export default Login;
import React from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import {setUserSession } from '../Utils/Common';
import {browserHistory} from 'react-router';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      invalid_auth : '',
      register_message : '',
      errors: {
        firstName : '',
        lastName : '',
        email: '',
        phone : '',
        password : ''
      },
    };

  }
  

  handleChange = event => {
      const { name, value } = event.target; 
      let errors = this.state.errors;
      this.setState({ errors, [name]: value });
  };

  handleSubmit = event => {
      event.preventDefault();
      let data = this.state;
      let errors = this.state.errors;

      if(data.firstName == ''){
        errors.firstName= 'First Name is required!'
      } else {
         if(data.firstName.length < 5 ){
          errors.firstName= 'First Name should at least 5-charactor long!'
         } else {
           errors.firstName= ''
         }
      }

      if(data.lastName == ''){
        errors.lastName = 'Last Name is required!'
      }
      else {
        if(data.lastName.length < 5 ){
         errors.lastName= 'Last Name should at least 5-charactor long!'
        } else {
          errors.lastName= ''
        }
     }
      if(data.email == ''){
        errors.email= 'Email is required!'
      }  else {
          errors.email= ''
      }

      if(data.password == ''){
        errors.password = 'Password is required!'
      }
      else {
        if(data.password.length < 5 ){
         errors.password= 'Password should at least 5-charactor long!'
        } else {
          errors.password= ''
        }
     }
      
      if(data.phone == ''){
        errors.phone= 'Phone is required!'
      }
      else {
        if(data.phone.length < 10 ){
         errors.phone= 'phone should at least 10-charactor long!'
        } else {
          errors.phone= ''
        }
     }
      this.setState({ errors });
      
      if(this.state.errors.firstName === '' && this.state.errors.firstName === '' && this.state.errors.email === '' && this.state.errors.phone === '' && this.state.errors.password === '') {
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
            if(invalid_auth == 'User already registered.'){
               this.setState({invalid_auth : invalid_auth});
            } else {
              this.setState({invalid_auth: ''});
            }
            return false;
          });
      } else {
        console.log('Invalid form');
      }
  }

  
  render() {
    return (
      <div style={{margin: '209px',
      marginTop: '20px'}}>
          <span className='error' style={{color: "red"}}>{this.state.register_message !=='' && this.state.register_message}</span>
          <span className='error' style={{color: "red"}}>{this.state.invalid_auth !=='' && this.state.invalid_auth}</span>

          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" name="firstName" onChange={this.handleChange} />
              <span className='error' style={{color: "red"}}>{this.state.errors.firstName}</span>

            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" name="lastName" onChange={this.handleChange} />
              <span className='error' style={{color: "red"}}>{this.state.errors.lastName}</span>

            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <span className='error' style={{color: "red"}}>{this.state.errors.email}</span>

            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
              <span className='error' style={{color: "red"}}>{this.state.errors.password}</span>

            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone Number" name="phone" onChange={this.handleChange} />
              <span className='error' style={{color: "red"}}>{this.state.errors.phone}</span>

            </Form.Group>
            <Button style={{background: '#3e3434'}} type="submit">
              Submit
            </Button>
          </Form>
      </div>
    );
  } 
}

export default Register;
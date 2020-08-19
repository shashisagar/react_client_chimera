import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {FormControl,FormGroup, Image, Card, Button} from "react-bootstrap";
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { ChatList } from 'react-chat-elements'
import { getToken } from  '../Utils/Common';
import { getUser, removeUserSession } from '../Utils/Common';
import  { Redirect } from 'react-router-dom';
import {Container,Row,Col} from "react-bootstrap";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

class Chat extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      listItems : [],
      seachText : '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(val) {
    this.props.onChatClicked(val);
  }

  _handleSearchChange = e => {
    let listItems = this.state.listItems;
    let c2 = this.props.userList;
    let { value } = e.target;
    let lowercasedValue = value.toLowerCase();
    let c3 = c2.filter(e =>
      e.firstName.toLowerCase().includes(lowercasedValue)
    );
    this.setState({seachText: value})
    this.setState({
      listItems : c3
    })
  };

  render() {
    let userlist = '';
    const user = getUser();
    if(!user) {
      return <Redirect to='/login'  />
    }

    let searchTerm = this.state.seachText;
    if(searchTerm !='') {
      userlist = this.state.listItems;
    } else {
      userlist = this.props.userList;
    }
    return <div>
           <FormGroup>
            <FormControl
              type="text" onChange={this._handleSearchChange}
              placeholder="Search for a user here..."
            />
          </FormGroup> 

          <div>
              {userlist.map((f,i) => (
                <Row key={i} onClick={() => this.handleClick(f)}>
                   {/* <Col md={2}>
                    </Col>
                  <Col md={2}>{f.firstName} </Col>
                  <Col>{f.status}</Col> */}
                  {/* <Col>{f.typing}</Col> */}
                  <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Text>
                          <Row>

        { f.status == 'online'
        ? <Image style={{ width: 10 +"%"}} src="./icons8-green-circle-48.png" />
        : <Image style={{ width: 10 +"%"}} src="./icons8-circle-30.png"/> }
                  
                          <Col md={2}><Image  style={{ width: 70 +"%"}} src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg" roundedCircle /></Col>
                          <Col md={5}>{f.firstName} </Col>
                          <Col md={3}>{f.unread_count} </Col>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                  </Card>
                </Row>
              ))}
          </div>
    </div>;
  }
}

export default Chat;
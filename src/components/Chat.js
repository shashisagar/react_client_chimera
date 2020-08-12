import React from 'react';
import axios from 'axios';
import {FormControl,FormGroup} from "react-bootstrap";
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
                  <Col>{f.firstName} </Col>
                  <Col>{f.status}</Col>
                  <Col>{f.count}</Col>
                  <Col>{f.typing}</Col>
                </Row>
              ))}
          </div>
    </div>;
  }
}

export default Chat;
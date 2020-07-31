import React from 'react';
import axios from 'axios';
import {FormControl,FormGroup} from "react-bootstrap";
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { ChatList } from 'react-chat-elements'
import { getToken } from  '../Utils/Common';
import { getUser, removeUserSession } from '../Utils/Common';
import  { Redirect } from 'react-router-dom'



class Chat extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      listItems : []
    };
  }

  componentDidMount(){
    const user = getUser();
    const obj = JSON.parse(user);
    const user_id = obj._id;
    const config = {
      method: 'get',
      url: 'http://127.0.0.1:8080/api/users/getUser/'+user_id,
      headers: { 'x-auth-token': sessionStorage.getItem('token') }
    }
    axios(config)
    .then(res => {
        let data = res.data;
        const listItems = data.map((d) => <li key={d.firstName}>{d.firstName}</li>);
        this.setState({listItems : data})
    })
    .catch((error) => {
        console.log(error)
    })
  }
  render() {
    const user = getUser();
    if(!user) {
      return <Redirect to='/login'  />
    }
    return <div>
           <FormGroup>
            <FormControl
              type="text"
              placeholder="Search for a user here..."
            />
          </FormGroup> 
          <ChatList
            className="chat-list"
            dataSource={this.state.listItems.map((f, i) => {
              let date = null;
              let subtitle = "";
              return {
                avatar: 'https://facebook.github.io/react/img/logo.svg',
                alt: f.firstName,
                title: f.firstName,
                subtitle: f.firstName,
                date: date,
                unread: f.unread,
                user: f.firstName,
                id : f._id
              };
            })            
          }
          onClick={this.props.onChatClicked}
          />
    </div>;
  }
}

export default Chat;
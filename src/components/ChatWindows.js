import React from 'react';
import axios from 'axios';
import Chat from './Chat';
import ChatBox from './ChatBox';
import {Container,Row,Col} from "react-bootstrap";
import socketIOClient from "socket.io-client";
import { getUser, removeUserSession } from '../Utils/Common';
const ENDPOINT = "http://localhost:8080";


class ChatWindows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), messageData: [], to : '', title : '', userList :[] , userinfo: '' };
    }
    componentDidMount() {
        this.initSocketConnection();
        this.setupSocketListeners();
        const user = getUser();
        const obj = JSON.parse(user);
        const user_id = obj._id;
        this.socket.emit("adduser", obj);
    }
    
    initSocketConnection() {
        this.socket = socketIOClient.connect(ENDPOINT);
    }

    setupSocketListeners() {
        this.socket.on("message", this.onMessageRecieved.bind(this));
        this.socket.on("usernames", this.onMessage.bind(this));
        this.socket.on("typing", this.addTyping.bind(this));
    }

    addTyping(e){
        //console.log(e);
        const userlist = this.state.userList;
        for (var i = 0; i < userlist.length; i++) {
            if(e.text !='') {
                if(userlist[i]['_id'] == e.id) {
                    userlist[i]['typing'] = 'typing...';
                } else {
                    userlist[i]['typing'] = '';
                } 
            } else {
                userlist[i]['typing'] = '';
            }
        } 
        this.setState({userList : userlist})  
    }

    onMessage(message) {
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
              let keyArray  = [];
              Object.keys(message).forEach(function(key) {
                  keyArray.push(message[key]);
              });
              let userlist = data;
              for (var i = 0; i < userlist.length; i++) {
                  if(keyArray.includes(userlist[i]['_id'])){
                      userlist[i]['status'] = 'online';
                  } else {
                      userlist[i]['status'] = 'offline';
                  }
                  const length = (userlist[i]['message']).length;
                  userlist[i]['count'] = length;
              } 
              this.setState({userList : userlist})  
          })
          .catch((error) => {
              console.log(error)
          })
    }

    onMessageRecieved(message) {
        const user = getUser();
        var obj = JSON.parse(user);
        if(obj._id == message.from) {
            message.message.position = 'right';  
        } else {
            message.message.position = 'left';  
        }
        let messageData = this.state.messageData;
        messageData = message.message;
        this.setState(prevState => ({
            messageData : [...prevState.messageData, messageData]
        }))

        const user_id = obj._id;
        const config = {
            method: 'get',
            url: 'http://127.0.0.1:8080/api/users/getUser/'+user_id,
            headers: { 'x-auth-token': sessionStorage.getItem('token') }
          }
          axios(config)
          .then(res => {
              let data = res.data;
              let keyArray  = [];
              Object.keys(message).forEach(function(key) {
                  keyArray.push(message[key]);
              });
              let userlist = data;
              for (var i = 0; i < userlist.length; i++) {
                  if(keyArray.includes(userlist[i]['_id'])){
                      userlist[i]['status'] = 'online';
                  } else {
                      userlist[i]['status'] = 'offline';
                  }
                  const length = (userlist[i]['message']).length;
                  userlist[i]['count'] = length;
              } 
              this.setState({userList : userlist})  
          })
          .catch((error) => {
              console.log(error)
          })
    }

    createMessage(text) {     
        const user = getUser();
        var obj = JSON.parse(user);
        let message = {
            message: {
              position: 'right',
              type: "text",
              text: text,
              date: +new Date(),
              className: "message"
            },
            to: this.state.to,
            from: obj._id,
            is_read : 0
        };
        this.socket.emit("message", message);
    }

    onChatClicked(e) {
        let to = this.state.to;
        let title = this.state.title;
        to = e._id;
        title = e.title;
        this.setState({to,title});
        const user = getUser();
        var obj = JSON.parse(user);
        const user_id = obj._id;
        const userinfo = e.firstName;
        console.log(userinfo);
        const config = {
            method: 'get',
            url: 'http://127.0.0.1:8080/api/users/getMessages/'+to+'/'+user_id,
            headers: { 'x-auth-token': sessionStorage.getItem('token') }
        }
        axios(config)
        .then(res => {
            const data = res.data;
            var chatList = [];
            for (var i = 0; i < data.length; i++) {
                var chat = {};
                chat['type'] = "text";
                chat['text'] = data[i]['message'];
                chat['date'] = +new Date(data[i]['created_date']);
                chat['className'] = "message";
                if(user_id == data[i]['fromId']) {
                    chat['position'] = "right";
                } else {
                    chat['position'] = "left";
                }
                chat['is_read'] = data[i]['is_read'];
                chatList.push(chat);
            }   
            let messageData = this.state.messageData;
            messageData = chatList;
            this.setState({
                messageData,
            })
        })
        .catch((error) => {
            console.log(error)
        })

        const userlist = this.state.userList;
        for (var i = 0; i < this.state.userList.length; i++) {
            userlist[i]['count'] = 0;
        } 
        this.setState({userList : userlist, userinfo : userinfo})  
    }

    onkeyPressed(e) {
        const user = getUser();
        var obj = JSON.parse(user);
        const keyPressData = { 'id' : obj._id, 'text': e};
        this.socket.emit("typing", keyPressData);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={4}> <Chat onChatClicked={this.onChatClicked.bind(this)} userList={this.state.userList}
                                   
                    /> </Col>
                    <Col md={8}>
                        <ChatBox onSendClicked={this.createMessage.bind(this)}
                                 greeting={this.state.messageData} userinfo={this.state.userinfo}
                                 onMessageKeyPress={this.onkeyPressed.bind(this)}
                                 /> 
                    </Col>
                </Row>
            </Container>
        ); 
    }
}

export default ChatWindows;
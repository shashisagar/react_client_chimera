import React from 'react';
import axios from 'axios';
import Chat from './Chat';
import ChatBox from './ChatBox';
import EmptyChatWindows from './EmptyChatWindows';
import {Container,Row,Col} from "react-bootstrap";
import socketIOClient from "socket.io-client";
import { getUser } from '../Utils/Common';
const ENDPOINT = "http://localhost:8080";


class ChatWindows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), messageData: [], to : '', title : '', userList :[] , userinfo: '' , status: '', userids : [], active : ''};
    }
    componentDidMount() {
        const user = getUser();
        const obj = JSON.parse(user);
        if(obj == null){
            this.props.history.push('/login');
        } else {
            this.initSocketConnection();
            this.setupSocketListeners();
            this.socket.emit("adduser", obj);
        }
      
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
        const user = getUser();
        var obj = JSON.parse(user);
        const userlist = this.state.userList;
        for (var i = 0; i < userlist.length; i++) {          
            if(e.text !='') {
                if(userlist[i]['_id'] === e.fromId) {
                    if((obj._id === e.toId)) {
                        userlist[i]['typing'] = 'typing...';
                    }
                } 
            }
            else {
                if((obj._id === e.toId)) {
                    if(userlist[i]['_id'] === e.fromId) {
                        userlist[i]['typing'] = '';
                    } 
                }
            }
        } 
        this.setState({userList : userlist})  
    }

    // For online/offline , get online user on login and assign into user array
    onMessage(userids) {
        let userid = this.state.userids;
        userid = userids;
        this.setState({userids : userid})  
        this.getUserData(userids);
    }

    onMessageRecieved(message) {
        const user = getUser();
        var obj = JSON.parse(user);
        if((this.state.to === message.to && obj._id === message.from) || (this.state.to === message.from && obj._id === message.to)) {
            if(obj._id === message.from) {
                message.message.position = 'right';  
            } else {
                message.message.position = 'left';  
            }
            let messageData = this.state.messageData;
            //console.log(message);
            messageData = message.message;
            this.setState(prevState => ({
                messageData : [...prevState.messageData, messageData]
            }))
        }  
        this.getUserData(this.state.userids);    
    }

    getUserData(userids) {
        let users = this.state.userList;
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
              Object.keys(userids).forEach(function(key) {
                  keyArray.push(userids[key]);
              });

            //   let typingUsers  = [];
            //   for (var i = 0; i < users.length; i++) {
            //      if(users[i]['typing'] === 'typing...') {
            //         typingUsers.push(users[i]['_id']);
            //      } else {
            //         typingUsers.push('');
            //      }  
            //   }
              let userlist = data;
              for (var i = 0; i < userlist.length; i++) {
                    if(keyArray.includes(userlist[i]['_id'])){
                        userlist[i]['status'] = 'online';
                    } else {
                        userlist[i]['status'] = 'offline';
                    }
                    // if(typingUsers.includes(userlist[i]['_id'])){
                    //     userlist[i]['typing'] = 'typing...';
                    // } else {
                    //     userlist[i]['typing'] = '';
                    // }
                    const len = userlist[i]['message'].length;
                    if(len > 0) {
                        userlist[i]['time_calculate'] = userlist[i]['message'][len-1]['created_date'];
                    } else {
                        userlist[i]['time_calculate'] = '';
                    }

                    var unread_count = 0;
                    for(var j=0; j< len; j++) {
                        if(userlist[i]['message'][j]['toId'] === user_id && userlist[i]['message'][j]['is_read'] === 0) {
                            unread_count++;
                        }
                    }
                    userlist[i]['unread_count'] = unread_count;
                } 
              this.setState({userList : userlist})  
              userlist.sort((a, b) => (a.time_calculate < b.time_calculate) ? 1 : -1)
              this.setState({userList : userlist});
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
        let status = this.state.status;
        let active = this.state.active;
        to = e._id;
        status = e.status;
        active = false;
        this.setState({to,status,active});
        console.log(this.state.active);
        const user = getUser();
        var obj = JSON.parse(user);
        const user_id = obj._id;
        const userinfo = e.firstName +" "+e.lastName;
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
                if(user_id === data[i]['fromId']) {
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
            if(to === userlist[i]['_id']){
                userlist[i]['unread_count'] = '';
            }
        } 
        this.setState({userList : userlist, userinfo : userinfo})  
    }

    onkeyPressed(e) {
        const user = getUser();
        var obj = JSON.parse(user);
        const keyPressData = { 'fromId' : obj._id, 'text': e , 'toId' : this.state.to};
        this.socket.emit("typing", keyPressData);
    }

    render() {
            return (
                <Container>
                    <Row>
                        <Col md={4}> <Chat onChatClicked={this.onChatClicked.bind(this)} userList={this.state.userList} emojiState = {this.state.active} 
                        /> </Col>
    
                    {
                        this.state.to
                            ?   <Col md={8}>
                                    <ChatBox onSendClicked={this.createMessage.bind(this)}
                                        greeting={this.state.messageData} userinfo={this.state.userinfo}
                                        onMessageKeyPress={this.onkeyPressed.bind(this)}
                                        emojiStateCheck = {this.state.active} 
                                        /> 
                                </Col>
                                : 
                                <Col md={8} style = {{ border: "1px solid black", textAlign : 'center',fontSize: 'xxx-large'
                            }}>
                                    <EmptyChatWindows />
                                </Col>
                    }
                    </Row>
                </Container>
            ); 
       
    }
}

export default ChatWindows;
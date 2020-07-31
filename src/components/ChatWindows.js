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
        this.state = {date: new Date(), messageData: [], to : '', title : ''};
    }
    componentDidMount() {
        this.initSocketConnection();
        this.setupSocketListeners();
    }
    
    initSocketConnection() {
        this.socket = socketIOClient.connect(ENDPOINT);
    }

    setupSocketListeners() {
        this.socket.on("message", this.onMessageRecieved.bind(this));
    }

    onMessageRecieved(message) {
        let messageData = this.state.messageData;
        messageData = message.message;
        this.setState(prevState => ({
            messageData : [...prevState.messageData, messageData]
        }))
    }

    createMessage(text) {     
        const user = getUser();
        var obj = JSON.parse(user);
        let message = {
            message: {
              type: "text",
              text: text,
              date: +new Date(),
              className: "message"
            },
            to: this.state.id,
            from: obj._id
        };
        this.socket.emit("message", message);
    }

    onChatClicked(e) {
        let id = this.state.id;
        let title = this.state.title;
        id = e.id;
        title = e.title;
        this.setState({id,title});
        const user = getUser();
        var obj = JSON.parse(user);
        const user_id = obj._id;

        console.log(id);
        console.log("jjjj");
        console.log(user_id);

        const config = {
            method: 'get',
            url: 'http://127.0.0.1:8080/api/users/getMessages/'+id+'/'+user_id,
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
                chat['date'] = +new Date();
                chat['className'] = "message";
                chatList.push(chat);
            }     
            console.log(chatList);
            let messageData = this.state.messageData;
            messageData = chatList;
            this.setState({
                messageData
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={4}> <Chat onChatClicked={this.onChatClicked.bind(this)}/> </Col>
                    <Col md={8}>
                        <ChatBox onSendClicked={this.createMessage.bind(this)}
                                 greeting={this.state.messageData} userinfo={this.state.title}/> 
                    </Col>
                </Row>
            </Container>
        ); 
    }
}

export default ChatWindows;
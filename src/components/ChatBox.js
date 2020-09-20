import React from "react";
import {FormControl, Image} from "react-bootstrap";
import {InputGroup} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {FormGroup} from "react-bootstrap";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import '../index.css';


import {
  MessageList,
} from "react-chat-elements";

class ChatBox extends React.Component {
  state = {
    messageText: "",
    text : "",
    active: false,
  };

  componentWillReceiveProps(){
    let active = this.props.emojiStateCheck;
    this.setState({active});
  }

  /**
   *
   * Sends a message only if it is not falsy.
   */
  onSendClicked() {
    if (!this.state.messageText) {
      return;
    }
    this.props.onSendClicked(this.state.messageText);
    this.setState({ messageText: "" });
  }
  onMessageInputChange(e) {
    this.setState({ messageText: e.target.value });
  }
  /**
   *
   * @param {KeyboardEvent} e
   *
   * listen for enter pressed and sends the message.
   */

  onMessageKeyUp(e) {
    this.props.onMessageKeyPress(e.target.value);
  } 

  onMessageKeyPress(e) {
    if (e.key === "Enter") {
      this.onSendClicked();
    }
  }

  addEmoji = e => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    this.setState({
      messageText: this.state.messageText + emoji
    })
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  componentDidUpdate(prevProps, prevState){
    this.scrollToBottom();
  }

  scrollToBottom() {
    const {thing} = this.refs;
    thing.scrollTop = thing.scrollHeight - thing.clientHeight;
  }

  render() {
    return (
        <div>
                <div className="userInfoClass ">
                  <Image style={{width: '6%'}} src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg" roundedCircle />
                  <span style={{padding: '20px'}}>{this.props.userinfo}</span>
                </div>
            
            <div className="messss" ref={`thing`}>
                <MessageList
                  className='message-list'
                  lockable={true}
                  toBottomHeight={'100%'}
                  dataSource={this.props.greeting}
                />          
            </div>
            <div className="messageButton">
                <FormGroup>
                    <InputGroup>
                      <FormControl type="text"
                      value={this.state.messageText}
                      onChange={this.onMessageInputChange.bind(this)}
                      onKeyPress={this.onMessageKeyPress.bind(this)} 
                      onKeyUp={this.onMessageKeyUp.bind(this)}
                      placeholder="Type a message here ..."/>
                      <Image className="emojiStyle" src="./icons8-slightly-smiling-face-48.png" onClick={this.toggleClass.bind(this)}/>
                      <Button className="messageSend" onClick={this.onSendClicked.bind(this)}>
                        Send
                      </Button>
                    </InputGroup>
                </FormGroup>

                {this.state.active ?   <span>
                   <Picker onSelect={this.addEmoji} />
                  </span> : ''}
            </div>
        </div>
    );
  }
}

export default ChatBox;
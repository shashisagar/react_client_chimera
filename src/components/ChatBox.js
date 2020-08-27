import React from "react";
import {FormControl, Image} from "react-bootstrap";
import {InputGroup} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {FormGroup} from "react-bootstrap";

import {
  MessageList,
  Navbar as NavbarComponent,
} from "react-chat-elements";

class ChatBox extends React.Component {

  state = {
    messageText: ""
  };

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
  render() {
    return (
        <div>
           <NavbarComponent
              left={
                <div>
                  <Image  style={{ width: 20 +"%"}} src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg" roundedCircle />
                  {this.props.userinfo}
                </div>
              }
            /> 
            <div>
                <MessageList
                  className='message-list'
                  lockable={true}
                  toBottomHeight={'100%'}
                  dataSource={this.props.greeting}
                />          
            </div>
            <div style={{position: 'fixed', bottom: '0' , width: '60%' }}>
                <FormGroup>
                    <InputGroup>
                      <FormControl type="text"
                      value={this.state.messageText}
                      onChange={this.onMessageInputChange.bind(this)}
                      onKeyPress={this.onMessageKeyPress.bind(this)} 
                      onKeyUp={this.onMessageKeyUp.bind(this)}
                      placeholder="Type a message here (Limit 3000 characters)..."/>
                      <Button variant="primary" onClick={this.onSendClicked.bind(this)}>
                        Send
                      </Button>
                    </InputGroup>
                </FormGroup>
            </div>
        </div>
    );
  }
}

export default ChatBox;
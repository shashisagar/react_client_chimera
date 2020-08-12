import React, { Component } from "react";
import {FormControl} from "react-bootstrap";
import {InputGroup} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {FormGroup,Col} from "react-bootstrap";

import {
  MessageList,
  Navbar as NavbarComponent,
  Avatar
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
                  <Col mdHidden lgHidden>
                    <p className="navBarText">
                    </p>
                  </Col>
                  <p className="navBarText">{this.props.userinfo}</p>
                </div>
              }
            /> 
        <div>
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={this.props.greeting} />          
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
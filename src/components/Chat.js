import React from 'react';
import {FormControl,FormGroup, Image, Card} from "react-bootstrap";
import 'react-chat-elements/dist/main.css';
import {Row,Col} from "react-bootstrap";

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
    let searchTerm = this.state.seachText;
    if(searchTerm !=='') {
      userlist = this.state.listItems;
    } else {
      userlist = this.props.userList;
    }
    var custom_css = {	
        border: 'solid 1px black',
        margin: '1px 0px 0px 0px ! important',
        padding: 'inherit',
        marginRight: '0px',
        marginTop: '1px',
        paddingTop: '16px',
        paddingBottom: '11px',
        backgroundColor: 'gainsboro'
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
                <Row style={custom_css} key={i} onClick={() => this.handleClick(f)}>
                   {/* <Col md={2}>
                    </Col>
                  <Col md={2}>{f.firstName} </Col>
                  <Col>{f.status}</Col> */}
                  {/* <Col>{f.typing}</Col> */}
                  {/* <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Text>
                          <Row> */}
                              { f.status === 'online'
                              ? <Image style={{ width: 5 +"%"}} src="./icons8-green-circle-48.png" />
                              : <Image style={{ width: 5 +"%"}} src="./icons8-circle-30.png"/> }
                      
                              <Col md={2}><Image  style={{ width: 70 +"%"}} src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg" roundedCircle /></Col>
                              <Col md={5}>{f.firstName} </Col>
                              <Col md={3}>{f.unread_count === 0 ? '': f.unread_count} </Col>
                          {/* </Row>
                        </Card.Text>
                      </Card.Body>
                  </Card> */}
                </Row>
              ))}
          </div>
    </div>;
  }
}

export default Chat;
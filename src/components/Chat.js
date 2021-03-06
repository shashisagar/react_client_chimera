import React from 'react';
import {FormControl,FormGroup, Image} from "react-bootstrap";
import 'react-chat-elements/dist/main.css';
import {Row,Col} from "react-bootstrap";
import Moment from 'moment';


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
    val.active =false;
    this.props.onChatClicked(val);
  }

  _handleSearchChange = e => {
    let c2 = this.props.userList;
    let { value } = e.target;
    let lowercasedValue = value.toLowerCase();
    let c3 = c2.filter(e =>
      (e.firstName + " "+e.lastName).toLowerCase().includes(lowercasedValue)
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
        cursor: 'pointer',
        marginLeft : '1px'
      }
    var count_css = {
      borderRadius: '37px',
      color: 'red',
      marginLeft: '260px',
      marginTop: '-53px'
    } 
    
    return <div>
           <FormGroup className="searchText">
            <FormControl
              type="text" onChange={this._handleSearchChange}
              placeholder="Search for a user here..."
            />
          </FormGroup> 
          <div>
              {userlist.map((f,i) => (
                <Row style={custom_css} key={i} onClick={() => this.handleClick(f)}>
                    { f.status === 'online'
                    ? <Image className="onlineStyle" src="./icons8-green-circle-30.png" />
                    : <Image className="onlineStyle" src="./icons8-circle-30.png"/> }
                  <Image  style={{ width: 15 +"%", height : 5 +"%"}} src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg" roundedCircle />
              <Col md={7}>{f.firstName} {f.lastName} <p>{f.message.map((f1,i1) => { if(i1 === f.message.length-1) return (f1.message).substr(0,4) }) } {""}

              <span>{f.message.map((f1,i1) => { if(i1 === f.message.length-1) return Moment(f1.created_date).format('DD-MM HH:mm')
 }) } </span>
</p>


</Col>

                  

                  {f.unread_count === 0 ? <Col md={3}></Col>: <Col md={3} style={count_css}>{f.unread_count}</Col>}
                  <Col md={2} className="typingClass">{f.typing}</Col>
                </Row>
              ))}
          </div>
    </div>;
  }
}

export default Chat;
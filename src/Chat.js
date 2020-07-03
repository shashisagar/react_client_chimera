import React from 'react';
import axios from 'axios';

class Chat extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      listItems : []
    };
  }

  componentDidMount(){
    axios
    .get(`http://127.0.0.1:8080/user/userList`, {})
    .then(res => {
        const data = res.data;
        const listItems = data.map((d) => <li key={d.firstName}>{d.firstName}</li>);
        this.setState({listItems : listItems})
    })
    .catch((error) => {
        console.log(error)
    })
   
  }
  render() {
    return <div>
          {this.state.listItems}
    </div>;
  }
}

export default Chat;
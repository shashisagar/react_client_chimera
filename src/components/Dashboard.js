import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';

class Dashboard extends React.Component {
  // handle click event of logout button
  handleLogout = () => {
    removeUserSession();
    this.props.history.push('/login');
    setTimeout(function(){ window.location.reload(false) }, 500);
  }
  render(){
    const user = getUser();
    const obj = JSON.parse(user);

    if(obj == null) {
       this.props.history.push('/login');
       return false;
    } else {
        return (
          <div>
            Welcome {obj.firstName}!<br /><br />
          </div>
        );
    }
  }
}
export default Dashboard;

import React from 'react'
import GuestNavBar from './GuestNavBar';
import LoginNavBar from './LoginNavBar';
import { getUser, removeUserSession } from '../Utils/Common';
import {browserHistory} from 'react-router';

class NavBar extends React.Component {
    handleLogout() {
        removeUserSession();
        browserHistory.push('/login');
        setTimeout(function(){ window.location.reload(false) }, 500);
    }
    render(){
        const user = getUser();
        const obj = JSON.parse(user);
        console.log(obj);
        return (
            <div>
                {obj == null ? <GuestNavBar /> : <LoginNavBar logoutHandler={this.handleLogout.bind(this)}/>
                }
            </div>
        );
    }
}

export default NavBar;


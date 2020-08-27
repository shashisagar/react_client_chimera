import React from 'react'
import { Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import ChatWindows from './ChatWindows';
import { getUser } from '../Utils/Common';

class LoginNavBar extends React.Component {
    logoutHandler() {
        this.props.logoutHandler();
    }

    render(){
        const user = getUser();
        const obj = JSON.parse(user);
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Chat Application</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/chat-windows">Chat</Nav.Link>
                          
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                Signed in as: <a href="#login">{obj.firstName} {obj.lastName}</a>
                                <input type="button" onClick={this.logoutHandler.bind(this)} value="Logout" />
                                </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <BrowserRouter>
                    <div>
                        <div className="content">
                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/chat-windows" component={ChatWindows} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default LoginNavBar;


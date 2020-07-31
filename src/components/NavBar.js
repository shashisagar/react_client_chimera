import React from 'react'
import { Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Chat from './Chat';
import ChatWindows from './ChatWindows';


class NavBar extends React.Component {
    render(){
        return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Chat Application</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link> 
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/chat-windows">Chat</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <BrowserRouter>
            <div>
                <div className="content">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
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

export default NavBar;


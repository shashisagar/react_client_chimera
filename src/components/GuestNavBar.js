import React from 'react'
import { Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class GuestNavBar extends React.Component {
    render(){
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>Chat Application</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Login</Nav.Link> 
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <BrowserRouter>
                <div className="bcakforms">
                <div className="container">
                    <div className="row">
                    
                        <div className="content login_register_page">
                        <div className="col-lg-12">
                            <Switch>
                                <Route exact path="/" component={Login} />
                                <Route path="/register" component={Register} />
                            </Switch>
                        </div>
                        </div>
                        </div>
                    </div>

                </div>
                    
                </BrowserRouter>
            </div>
        );
    }
}

export default GuestNavBar;


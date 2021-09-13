import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App'
import LeaderBoard from './components/LeaderBoard';
import SearchPage from './components/SearchPage';
import PlayerDetailsBanner from './components/PlayerDetailsBanner';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';


function NavigationBar() {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <LinkContainer to="/">
                            <Nav.Link>TFT Stats</Nav.Link>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/leader_board">
                                <Nav.Link>Leader Boards</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/users">
                                <Nav.Link>Users</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route path="/leader_board">
                    <LeaderBoard />
                </Route>
                <Route path="/users">
                    <App />
                </Route>
                <Route path="/player">
                    <PlayerDetailsBanner />
                </Route>
                <Route path="/">
                    <SearchPage />
                </Route>
            </Switch>
        </Router>
    );
}

ReactDOM.render(
    // Note StrictMode runs components twice
    <React.StrictMode>
        <NavigationBar />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

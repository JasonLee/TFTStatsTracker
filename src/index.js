import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App'
import LeaderBoard from './components/LeaderBoard';
import SearchPage from './components/SearchPage';
import PlayerDetailsBanner from './components/PlayerDetailsBanner';

function NavigationBar() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/leader_board">Leader Boards</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

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
      </div>
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

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Skills from './components/Skills';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/skills">Skills</Link>
            </li>
            <li>
              <Link to="/createtask">Create Task</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/skills">
            <Skills />
          </Route>
          <Route path="/createtask">
            <div>Create Task</div>
          </Route>
          <Route path="/">
            <div>Home</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

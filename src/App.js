import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Skills from './components/Skills';
import CreateTask from './components/CreateTask';
import TaskManagement from './components/TaskManagement';

// TODO: comment out nav to see without scaffolding
function App() {
  return (
    <Router>
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
          <li>
            <Link to="/tasks">Task Management</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/skills">
          <Skills />
        </Route>
        <Route path="/createtask">
          <CreateTask />
        </Route>
        <Route path="/tasks">
          <TaskManagement />
        </Route>
        <Route path="/">
          <div>Home</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

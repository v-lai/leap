import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/main/Login/Login';
import { Container } from './components/base/Container/Container';
import CreateTask from './components/main/CreateTask/CreateTask';
import Calendar from './components/main/TaskManagement/Calendar';
import TaskManagement from './components/main/TaskManagement/TaskManagement';
import styled from 'styled-components';

const NavContainer = styled(Container)`
  & > ul > li {
    margin: 1rem;
    text-align: center;
  }
`;

function Navigation(props) {
  return (
    <NavContainer style={{ justifyContent: 'center', fontSize: '1.5rem' }}>
      <ul>
        <li>
          <Link to='/login'>Login Component</Link>
        </li>

        {/*
          Declare your own custom routes here!
          This will aid in testing.
        */}

        <li>
          <Link to='/createtask'>Create Task</Link>
        </li>
        <li>
          <Link to='/task-management'>TaskManagement Component</Link>
        </li>
      </ul>
    </NavContainer>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>

      <Route path='/createtask'>
        <CreateTask />
      </Route>

      <Route path='/task-management'>
        <TaskManagement />
      </Route>

      <Route path='/calendar'>
        <Calendar />
      </Route>

      <Route path='/'>
        <Navigation />
      </Route>
    </Switch>
  );
}

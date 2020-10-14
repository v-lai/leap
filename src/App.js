import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/main/Login/Login';
import { Container } from './components/base/Container/Container';
import CreateTask from './components/main/CreateTask/CreateTask';
import TaskManagement from './components/main/TaskManagement/TaskManagement';
import CalendarView from './components/main/CalendarView/CalendarView';

function Navigation (props) {
  return (
    <Container style={{justifyContent: 'center', fontSize: '1.5rem'}}>
      <ul>
        <li>
          <Link to='/login'>Login Component</Link>
        </li>
        <li>
          <Link to='/createtask'>Create Task</Link>
        </li>
        <li>
          <Link to='/tasks'>Task Management</Link>
        </li>
        <li>
          <Link to='/calendar'>Calendar</Link>
        </li>

        {/*
          Declare your own custom routes here!
          This will aid in testing.
        */}
      </ul>
    </Container>
  )
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
      <Route path='/tasks'>
        <TaskManagement />
      </Route>
      <Route path='/calendar'>
        <CalendarView />
      </Route>

      <Route path='/'>
        <Navigation />
      </Route>
    </Switch>
  );
}

import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/main/Login/Login';
import { Container } from './components/base/Container/Container';
import TaskManagement from './components/main/TaskManagement/TaskManagement'

function Navigation (props) {
  return (
    <Container style={{justifyContent: 'center', fontSize: '1.5rem'}}>
      <ul>
        <li>
          <Link to='/login'>Login Component</Link>
        </li>

        {/*
          Declare your own custom routes here!
          This will aid in testing. 
        */}

        <li>
          <Link to='/task-management'>TaskManagement Component</Link>
        </li>
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

      <Route path='/task-management'>
        <TaskManagement />
      </Route>

      <Route path='/'>
        <Navigation />
      </Route>
    </Switch>
  );
}

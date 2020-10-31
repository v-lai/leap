import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/main/Login/Login';
import { Container } from './components/base/Container/Container';
import CreateTask from './components/main/CreateTask/CreateTask';
import Calendar from './components/main/TaskManagement/Calendar';
import TaskManagement from './components/main/TaskManagement/TaskManagement';
import styled from 'styled-components';
import { setAuthUser } from './actions';
import firebaseInit from './firebase';

const { auth } = firebaseInit;

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
          <Link to="/login">Login Component</Link>
        </li>

        {/*
          Declare your own custom routes here!
          This will aid in testing.
        */}

        <li>
          <Link to="/createtask">Create Task</Link>
        </li>
        <li>
          <Link to="/task-management">TaskManagement Component</Link>
        </li>
      </ul>
    </NavContainer>
  );
}

class App extends Component {
  componentDidMount() {
    this.listener = auth.onAuthStateChanged(user => {
      if (user) {
        this.props.onSetAuthUser(JSON.parse(localStorage.getItem('authUser')));
      } else {
        localStorage.removeItem('authUser');
        this.props.onSetAuthUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authenticated } = this.props;
    return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/createtask">
          {authenticated ? <CreateTask /> : <Redirect to="/login" />}
        </Route>

        <Route path="/task-management">
          {authenticated ? <TaskManagement /> : <Redirect to="/login" />}
        </Route>

        <Route path="/calendar">
          {authenticated ? <Calendar /> : <Redirect to="/login" />}
        </Route>

        <Route path="/">
          <Navigation />
        </Route>
      </Switch>
    );
  }
};

const mapStateToProps = (state) => ({
  authenticated: !!state.session.authUser
});

const mapDispatchToProps = (dispatch) => ({
  onSetAuthUser: (authUser) => {
    dispatch(setAuthUser(authUser));
  },
});


const AppReduxContainer = connect(mapStateToProps, mapDispatchToProps);
export default AppReduxContainer(App);

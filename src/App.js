import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/main/Login/Login';
import { Container } from './components/base/Container/Container';
import CreateTask from './components/main/CreateTask/CreateTask';
import Calendar from './components/main/TaskManagement/Calendar';
import TaskManagement from './components/main/TaskManagement/TaskManagement';
import styled from 'styled-components';
import { setAuthUser, setTasks } from './actions';
import firebaseInit from './firebase';

const { auth, firestore } = firebaseInit;

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
    this.listener = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = firestore.collection('users').doc(user.uid);
        try {
          const doc = await userRef.get();
          if (doc.exists) {
            const data = doc.data();
            localStorage.setItem('authUser', JSON.stringify(data));
            this.props.onSetAuthUser(data);
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const actual = `${year}-${month}-${day}`;
            // set tasks
            const querySnapshot = await userRef
              .collection('tasks')
              .where('actual', '==', actual)
              .get();
            const tasks = {};
            querySnapshot.forEach((doc) => {
              tasks[doc.id] = doc.data();
            });
            this.props.onSetTasks(tasks, [actual]);
          } else {
            localStorage.removeItem('authUser');
            this.props.onSetAuthUser(null);
          }
        } catch (error) {
          console.error('Loading error', error);
        }
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
  onSetTasks: (tasks, dates) => {
    dispatch(setTasks(tasks, dates));
  },
});


const AppReduxContainer = connect(mapStateToProps, mapDispatchToProps);
export default AppReduxContainer(App);

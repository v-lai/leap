import React, { Component } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/main/Login/Login';
import { Button } from './components/base/Button/Button';
import { Container } from './components/base/Container/Container';
import CreateTask from './components/main/CreateTask/CreateTask';
import Calendar from './components/main/TaskManagement/Calendar';
import TaskManagement from './components/main/TaskManagement/TaskManagement';
import { setAuthUser, setTasks } from './actions';
import styled from 'styled-components';
import { orange } from './themes/theme';
import leapLogo from './leapLogo.png';
import firebaseInit from './firebase';

const { auth, firestore } = firebaseInit;

const SplashContainer = styled(Container)`
  & > ul > li {
    margin: 1rem;
    text-align: center;
  }
`;

const Splash = () => {
  const history = useHistory();
  return (
    <SplashContainer style={{ justifyContent: 'center', fontSize: '1.5rem' }}>
      <img
        src={leapLogo}
        alt="Leap Logo"
        style={{
          width: '4rem',
          height: '4rem',
          margin: '30vh auto 36vh auto',
          boxShadow:
            '0px 6px 10px rgba(0, 0 , 0, 0.3), -6px -6px 10px rgba(0, 0 , 0, 0.3) ',
          borderRadius: '6px',
        }}
      />
      <Button
        type="submit"
        className="button"
        aria-label="get started"
        style={{
          backgroundColor: orange,
          minWidth: '60%',
          width: '4.375rem',
          height: '2.5rem',
          borderColor: orange,
          lineHeight: '2.5',
          fontSize: '1rem'
        }}
        onClick={() => history.push('/login', { signup: true })}
      >
        Get Started
      </Button>
    </SplashContainer>
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
          <Splash />
        </Route>
      </Switch>
    );
  }
};

const mapStateToProps = (state) => ({
  authenticated: !!localStorage.getItem('authUser') || !!state.session.authUser
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

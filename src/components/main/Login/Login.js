import React, { useState } from "react";
import { Route, Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Transition } from 'react-transition-group';
import { LoginContainer } from './styles';
import { Input } from '../../base/Input/Input';
import image from './leapLogo.png';
import { H1 } from '../../base/Text/Text';
import { setAuthUser } from '../../../actions';
import firebaseInit from '../../../firebase';

const { auth, googleAuthProvider, firestore } = firebaseInit;

const EMAIL_REGEX= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; // eslint-disable-line

const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{6,}/;


function LoginWrapper (props) {
  let history = useHistory();
  const [values, setValues] = useState({
    email: '', password: '', confirmPassword: '', signup: false, errorMessage: ''
  });
  const updateValue = (e) => {
    setValues({ ...values, errorMessage: '', [e.target.name]: e.target.value });
  };
  const signUpAuthWithEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (values.password !== values.confirmPassword) {
      updateValue({ target: { name: 'errorMessage', value: 'Passwords do not match' } });
      return;
    }
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(data => {
        const { uid, displayName, email } = data.user;
        const { providerId } = data.additionalUserInfo;
        const itemsToSet = {
          uid,
          displayName,
          email,
          providerId,
        };
        const usersRef = firestore.collection('users');
        usersRef
          .doc(uid)
          .set(itemsToSet)
          .then(() => {
            props.onSetAuthUser(data);
            history.push('/task-management');
          })
          .catch((error) => {
            console.log('user save error', error);
          });
      })
      .catch(err => {
        console.log('error', err);
        updateValue({ target: { name: 'errorMessage', value: err } });
      });
  };
  const handleAuthWithEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(data => {
        props.onSetAuthUser(data);
        history.push('/task-management');
      })
      .catch(err => {
        let errorMessage = '';
        switch (err.code) {
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Email address not found.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Invalid password. Please try again.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many tries. Please try again later.';
            break;
          default:
            errorMessage = 'Something went wrong. Please try again.';
        }
        console.log('errorMessage', errorMessage);
        updateValue({ target: { name: 'errorMessage', value: errorMessage } });
      });
  };
  const handleGoogleAuth = (e) => {
    e.preventDefault();
    e.stopPropagation();
    auth
      .signInWithPopup(googleAuthProvider)
      .then(function (data) {
        if (data.credential) {
          const { uid, displayName, email } = data.user;
          const { providerId } = data.additionalUserInfo;
          const itemsToSet = {
            uid,
            displayName,
            email,
            providerId,
          };
          const usersRef = firestore.collection('users');
          usersRef
            .doc(uid)
            .set(itemsToSet)
            .then(() => {
              props.onSetAuthUser(data);
              history.push('/task-management');
            })
            .catch((error) => {
              console.log('user save error', error);
            });
        }
      })
      .catch(function (error) {
        console.log('google auth error', error);
        // TODO: surface relevant error to user
      });
  };

  return (
    <>
      <form>
        <H1>{values.signup ? 'Create' : 'Login to'} your Account</H1>

        <label htmlFor='email'>
          <Input
            validate={ values.signup }
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            pattern={ EMAIL_REGEX.source }
            onChange={ updateValue }
          />
          <span>Invalid Email!</span>
        </label>

        <label htmlFor='password'>
          <Input
            validate={ values.signup }
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            onChange={ updateValue }
            pattern={ PASSWORD_REGEX.source }
          />
          <span>
            Password must be at least six characters long containing at least
            one uppercase, one lowercase, one number and one special char.
          </span>
        </label>

        <label
          htmlFor='confirm-password'
          className={`${values.signup ? 'animateHeight' : ''} normalHeight`}
          style={{
            willChange: 'opacity, visibility, max-height',
            transition: 'opacity 0.5s, visibility 0.5s, max-height 0.7s',
            transitionTimingFunction: 'ease-in-out',
          }}
        >
          <Input
            validate={ values.signup }
            id='confirm-password'
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            pattern={ values.password }
            onChange={ updateValue }
          />
          <span>Password does not match.</span>
        </label>

        { values.errorMessage &&
          <p>{values.errorMessage}</p>
        }
        <Input type='submit' value={`Sign ${values.signup ? 'Up' : 'In'}`} onClick={(e) => values.signup ? signUpAuthWithEmail(e) : handleAuthWithEmail(e) } />

        <span>or Sign {values.signup ? 'up' : 'in'} with</span>
      </form>


      <div>
        <Input type='button' value='Google' onClick={(e) => handleGoogleAuth(e)} /><br/>
        <p>{values.signup ? 'Already have an account?' : 'Don\'t have an account?'}
          <a onClick={() => setValues({...values, signup: !values.signup})}> {/* eslint-disable-line */}
            {values.signup ? " Login in" : " Sign up"} here
          </a>
        </p>
      </div>


      <div
        className={`${!values.signup ? 'animateHeight' : ''} normalHeight`}
        style={{
          willChange: 'opacity, max-height, visibility',
          transition: 'opacity 0.5s, visibility 0.5s, max-height 0.15s',
          transitionTimingFunction: 'ease-out',
          transitionDelay: `${!values.signup ? '0.5s' : '0s'}`
        }}
      >
        <Link to='/login/recover-your-account'>
          Forgot password?
        </Link>
      </div>
    </>
  )
}


function ForgetPassword (props) {
  return (
    <>
      <form>
        <H1 style={{ marginBottom: '1.5vh' }}>Forgot your password?</H1>

        <p>
          No worries! Enter your email and we'll send you a reset.
        </p>

        <Input
          validate={ false }
          id='email'
          name='email'
          type='email'
          placeholder='Email Address'
        />

        <Input type='submit' value='Send' />
      </form>

      <div>
        <Link to='/login'>
          Return to Log in
        </Link>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  authUser: state.session.authUser
});

const mapDispatchToProps = (dispatch) => ({
  onSetAuthUser: (authUser) => {
    if (!authUser.user) return;
    const { uid, displayName, email } = authUser.user;
    const { providerId } = authUser.additionalUserInfo;
    const itemsToSet = {
      uid,
      displayName,
      email,
      providerId
    };
    localStorage.setItem('authUser', JSON.stringify(itemsToSet));
    dispatch(setAuthUser(itemsToSet));
  },
});

const LoginReduxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
);

const WrappedLogin = LoginReduxContainer(LoginWrapper);

export default function Login (props) {
  return (
    <LoginContainer>
      <img
        src={image}
        alt='Leap Logo'
        style={{
          width: '4rem',
          height: '4rem',
          margin: '9vh auto 2vh auto',
          boxShadow: '0px 6px 10px rgba(0, 0 , 0, 0.3), -6px -6px 10px rgba(0, 0 , 0, 0.3) ',
          borderRadius: '6px',
        }}
      />

      <Route path='/login/recover-your-account'>
        <ForgetPassword />
      </Route>

      <Route exact path='/login'>
        <WrappedLogin />
      </Route>
    </LoginContainer>
  );
}

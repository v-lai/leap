import React, { useState } from "react";
import { Route, Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { LoginContainer } from './styles';
import { Input } from '../../base/Input/Input';
import image from './leapLogo.png';
import { H1 } from '../../base/Text/Text';

const EMAIL_REGEX= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


function LoginWrapper (props) {
  const [values, setValues] = useState({
    email: '', password: '', confirmPassword: '', signup: false
  });
  const updateValue = (e) => {
    if (e.target.name === 'email' && e.target.value.match(EMAIL_REGEX)) {
      setValues({ ...values, email: e.target.value });
    }

    setValues({ ...values, [e.target.name]: e.target.value });
  }



  return (
    <>
      <form>
        <H1>{values.signup ? 'Create' : 'Login to'} your Account</H1>

        <label htmlFor='email'>
          <Input 
            id='email' 
            name='email' 
            type='email' 
            placeholder='Email' 
            pattern={EMAIL_REGEX.source} 
            onChange={updateValue}
          />
          <span>Invalid Email!</span>
        </label>

        <label htmlFor='password'>
          <Input id='password' name='password' type='password' placeholder='Password' />
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
            id='confirm-password' 
            name='confirmPassword' 
            type='password' 
            placeholder='Confirm Password' 
          />
        </label>

        <Input type='submit' value={`Sign ${values.signup ? 'Up' : 'In'}`} />

        <span>or Sign {values.signup ? 'up' : 'in'} with</span>
      </form>
      
      


      <div>
        <div>
          <Input type='button' value='Google' /><br/>
          <p>{values.signup ? 'Already have an account?' : 'Don\'t have an account?'}
            <a onClick={() => setValues({...values, signup: !values.signup})}>
              {values.signup ? " Login in" : " Sign up"} here
            </a>
          </p>
        </div>
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
          Forgotten password?
        </Link>
      </div>
    </>
  )
}


function ForgetPassword (props) {
  return (
    <>
      <div>
        <H1 style={{ marginBottom: '1.5vh' }}>Forgot your password?</H1>

        <p>
          No worries! Enter your email and we'll send you a reset.
        </p>

        <Input 
          id='email' 
          name='email' 
          type='email' 
          placeholder='Email Address' 
          pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
        />

        <Input type='submit' value='Send' />
      </div>

      <div>
        <Link to='/login'>
          Return to Log in
        </Link>
      </div>
    </>
  )
}




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
        <LoginWrapper />
      </Route>
    </LoginContainer>
  )
}
import React, { useState } from "react";
import { Route, Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { LoginContainer } from './styles';
import { Input } from '../../base/Input/Input';
import image from './leapLogo.png';
import { H1 } from '../../base/Text/Text';


function LoginWrapper (props) {
  const [signup, setSignup] = useState(false);

  return (
    <>
      <div>
        <H1>{signup ? 'Create' : 'Login to'} your Account</H1>

        <label htmlFor='email'>
          <Input 
            id='email' 
            name='email' 
            type='email' 
            placeholder='Email' 
            pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
          />
          <span>Invalid Email!</span>
        </label>

        <label htmlFor='password'>
          <Input id='password' name='password' type='password' placeholder='Password' />
        </label>

        <label 
          htmlFor='confirm-password' 
          className={`${signup ? 'animateHeight' : ''} normalHeight`}
          style={{ 
            transition: 'opacity 0.5s, visibility 0.5s, max-height 0.7s',
            transitionTimingFunction: 'ease-in-out', 
          }}
        >
          <Input 
            id='confirm-password' 
            name='confirm-password' 
            type='password' 
            placeholder='Confirm Password' />
        </label>

        <Input type='submit' value={`Sign ${signup ? 'Up' : 'In'}`} />

        <span>or Sign {signup ? 'up' : 'in'} with</span>
      </div>
      
      {/* 
        There's a reason why I seperated out this one click login into
        seperate `div`. If we were to ever create a desktop view then this
        will go in right side. We can use `@media` query for that. :D
      */}
      <div>
        <div>
          <Input type='button' value='Google' /><br/>
          <p>{signup ? 'Already have an account?' : 'Don\'t have an account?'}
            <a onClick={() => setSignup(!signup)}>
              {signup ? " Login in" : " Sign up"} here
            </a>
          </p>
        </div>
      </div>

      <div
        className={`${!signup ? 'animateHeight' : ''} normalHeight`}
        style={{
          transition: 'opacity 0.5s, max-height 0.1s', 
          transitionTimingFunction: 'ease-out',
          transitionDelay: `${!signup ? '0.5s' : '0s'}`
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
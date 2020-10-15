import React, { useState } from "react";
import { Route, Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { LoginContainer } from './styles';
import { Input } from '../../base/Input/Input';
import image from './leapLogo.png';
import { H1 } from '../../base/Text/Text';


const EMAIL_REGEX= /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{6,}/;


function LoginWrapper (props) {
  const [values, setValues] = useState({
    email: '', password: '', confirmPassword: '', signup: false
  });
  const updateValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }


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

        <Input type='submit' value={`Sign ${values.signup ? 'Up' : 'In'}`} />

        <span>or Sign {values.signup ? 'up' : 'in'} with</span>
      </form>


      <div>
        <Input type='button' value='Google' /><br/>
        <p>{values.signup ? 'Already have an account?' : 'Don\'t have an account?'}
          <a onClick={() => setValues({...values, signup: !values.signup})}>
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
          Forgotten password?
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
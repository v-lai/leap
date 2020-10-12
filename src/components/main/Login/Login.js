import React, { useState } from "react";
import { Container } from './styles';
import { Input } from '../../base/Input/Input';
import image from './leapLogo.png';
import { H1 } from '../../base/Text/Text';

export default function Login (props) {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <img 
        src={image} 
        alt='Leap Logo'  
        style={{
          width: '4rem',
          height: '4rem',
          marginTop: '9vh',
          boxShadow: '0px 6px 10px rgba(0, 0 , 0, 0.3), -6px -6px 10px rgba(0, 0 , 0, 0.3) ',
          borderRadius: '6px',
        }}
      />

      <div>
        <H1>{visible ? 'Create' : 'Login'} your Account</H1>

        <label htmlFor='email'></label>
        <Input 
          id='email' 
          name='email' 
          type='email' 
          placeholder='Email' 
        />

        <label htmlFor='password'></label>
        <Input id='password' name='password' type='password' placeholder='Password' />

        {
          visible ? 
          <>
            <label htmlFor='confirm-password'></label>
            <Input id='confirm-password' name='confirm-password' type='password' placeholder='Confirm Password' /> 
          </> : ""
        }

        <Input type='submit' value={`Sign ${visible ? 'Up' : 'In'}`} />

        <span>or Sign {visible ? 'up' : 'in'} with</span>
      </div>
      
      {/* 
        There's a reason why I seperated out this one click login into
        seperate `div`. If we were to ever create a desktop view then this
        will go in right side. We can use `@media` query for that. :D
      */}
      <div>
        <div>
          <Input type='button' value='Google' /><br/>
          <p>{visible ? 'Already have an account?' : 'Don\'t have an account?'}
            <a href="#" onClick={() => setVisible(!visible)}>
              {visible ? " Login in" : " Sign up"} here
            </a>
          </p>
        </div>
        <a href="#">Forgot password?</a>
      </div>
    </Container>
  )
}
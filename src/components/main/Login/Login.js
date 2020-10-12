import React from "react";
import { Container } from './styles';
import { Input } from '../../base/Input/Input';
import image from './leapLogo.png';
import { H1 } from '../../base/Text/Text';

export default function Login (props) {
  return (
    <Container>
      <div>
        <img 
          src={image} 
          alt='Leap Logo'  
          style={{
            width: '4rem',
            height: '4rem',
            margin: '2rem auto',
            boxShadow: '0px 6px 10px rgba(0, 0 , 0, 0.3), -6px -6px 10px rgba(0, 0 , 0, 0.3) ',
          }}
        />

        <H1>Create your Account</H1>

        <label htmlFor='username'></label>
        <Input 
          id='username' 
          name='username' 
          type='text' 
          placeholder='Username' 
        />

        <label htmlFor='password'></label>
        <Input id='password' name='password' type='password' placeholder='Password' />

        <label htmlFor='confirm-password'></label>
        <Input id='confirm-password' name='confirm-password' type='password' placeholder='Confirm Password' />

        <Input type='submit' value='Sign Up' />

        <span>or Sign up with</span>
      </div>
      
      {/* 
        There's a reason why I seperated out this one click login into
        seperate `div`. If we were to ever create a desktop view then this
        will go in right side. We can use `@media` query for that. :D
      */}
      <div>
        
      </div>
    </Container>
  )
}
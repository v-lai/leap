import styled from 'styled-components';
import { Container } from '../../base/Container/Container';

const LoginContainer = styled(Container)`
  div, form {
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;
    transform: translateZ(0);

    & > p {
      width: 19.5rem;
      text-align: center;
      color: ${props => props.theme.fgColor};
      margin-bottom: 4vh;
    }
  }

  .animateHeight {
    opacity: 1 !important;
    visibility: visible !important;
    height: auto;
    max-height: 500px !important;
  }

  .normalHeight {
    max-height: 0;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
  }

  form {
    flex: 1 1 auto;
    padding-top: 3vh;

    input[type='submit'] ~ span {
      position: relative;
      width: 15.5rem;
      text-align: center;

      &:before, &:after {
        content: '';
        background: ${props => props.theme.fgColor};
        width: 3.5rem;
        height: 0.05rem;
        position: absolute;
        top: 50%;
      }

      &:before {
        left: 0;
      }

      &:after {
        right: 0;
      }
    }
  }

  div:first-of-type {
    flex: 1 0 auto;
    justify-content: flex-start;
    text-align: center;

    p {
      font-size: 0.7rem;
      color: ${props => props.theme.mutedColor};
      margin-top: -1.5vh;

      a {
        text-decoration: none;
        color: ${props => props.theme.fgColor}; 
      }
    }
  }

  div:last-of-type {
    flex: 1 1 auto;
    justify-content: center;
    color: ${props => props.theme.mutedColor};
    font-size: 0.8rem;
    max-height: 10vh;
  }
`;

export { LoginContainer };
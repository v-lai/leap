import styled from 'styled-components';
import { Container } from '../../base/Container/Container';

const LoginContainer = styled(Container)`
  div, form {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    align-items: center;
    flex: 0 1 auto;
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
    padding: 3vh 0;
    flex: 1 0 auto;

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
    flex: 1 1 auto;
    justify-content: space-evenly;

    & > div {
      text-align: center;

      & > p {
        font-size: 0.7rem;
        color: ${props => props.theme.mutedColor};
        margin-top: -1.5vh;

        & > a {
          text-decoration: none;
          color: ${props => props.theme.fgColor}; 
        }
      }
      
    }
  }

  div:last-of-type {
    flex: 1 1 auto;
    justify-content: center;
    color: ${props => props.theme.mutedColor};
    font-size: 0.8rem;
  }
`;

export { LoginContainer };
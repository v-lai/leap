import styled from 'styled-components';
import { Container } from '../../base/Container/Container';

const LoginContainer = styled(Container)`
  & > div {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    align-items: center;
    flex: 0 1 auto;

    & > p {
      width: 19.5rem;
      text-align: center;
      color: ${props => props.theme.fgColor};
      margin-bottom: 4vh;
    }
  }

  & > div:nth-child(2) {
    padding: 3vh 0;

    & > input[type='submit'] ~ span {
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

  & > div:nth-child(3) {
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

  & > div:nth-child(4) {
    flex: 1 1 auto;
    justify-content: center;
    color: ${props => props.theme.mutedColor};
    font-size: 0.8rem;
  }
`;

export { LoginContainer };
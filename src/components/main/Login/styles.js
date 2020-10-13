import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.theme.bgColor};
  width: 100vw; height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    align-items: center;
    flex: 0 1 auto;
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

  & > div:last-child {
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

    & > a {
      color: ${props => props.theme.mutedColor};
      font-size: 0.8rem;
    }
  }
`;

export { Container };
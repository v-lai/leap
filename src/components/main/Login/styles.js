import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.theme.bgColor};
  width: 100vw; height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  & > div {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    align-items: center;
    padding: 2rem;
  }

  & > div:first-child {
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
    
  }
`;

export { Container };
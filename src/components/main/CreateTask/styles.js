import styled from 'styled-components';

const Container = styled.div`
  background: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 100vh;
  display: grid;
  padding: 1.5rem max(1rem, calc(100vw - 400px) / 2) 2rem
    max(1rem, calc(100vw - 400px) / 2);
  align-items: center;
  justify-items: center;
  overflow-y: scroll;

  & > div {
    width: min(80vw, 400px);
  }

  .react-date-picker {
    background-color: #FFF;
  }
`;

export { Container };

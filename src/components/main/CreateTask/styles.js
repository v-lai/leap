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

  .rmc-date-picker {
    & .rmc-picker:nth-child(1) {
      order: 2;
    }
    & .rmc-picker:nth-child(2) {
      order: 1;
      flex: 2 2 0% !important;
    }
    & .rmc-picker:nth-child(3) {
      order: 0;
    }
  }
`;

export { Container };

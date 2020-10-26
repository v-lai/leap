import styled from 'styled-components';

const Container = styled.div`
  background: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
  overflow-y: scroll;

  label.taskName {
    font-size: 0.813rem;
    font-weight: bold;
    line-height: normal;
  }

  #start-date,
  #end-date {
    width: auto;
  }
`;

export { Container };

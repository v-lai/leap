import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(#aedfd6, #16425b);
  height: calc(100vh - 3rem);
  width: 100vw;
  padding: 1.5rem max(1rem, calc(100vw - 400px) / 2) 2rem
    max(1rem, calc(100vw - 400px) / 2);
  text-align: center;
  overflow-y: scroll;

  & > div p {
    color: #faf9f9;
    text-shadow: 0 2pt 4pt rgba(0, 0, 0, 0.2);
    margin: 2rem 0 1rem;
  }
`;

export { Container };

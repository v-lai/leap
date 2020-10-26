import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.theme.bgColor};
  width: 100vw; height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { Container };
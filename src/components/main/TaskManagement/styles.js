import styled from 'styled-components';
import { Container } from '../../base/Container/Container';

const TaskManageContainer = styled(Container)`
  display: block;
  background: linear-gradient(${props => props.theme.bgColor}, #16425b);
  height: calc(100vh - 3rem);
  padding: 1.5rem max(1rem, calc(100vw - 400px) / 2) 2rem
    max(1rem, calc(100vw - 400px) / 2);
  text-align: center;
  overflow-y: scroll;

  div p {
    color: #faf9f9;
    text-shadow: 0 2pt 4pt rgba(0, 0, 0, 0.2);
    margin: 2rem 0 1rem;
  }
`;

export { TaskManageContainer };

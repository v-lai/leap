import styled from 'styled-components';
import { darkNavy, white } from '../../../themes/theme';

const Button = styled.button`
  font-family: 'Montserrat', 'Helvetica', 'Arial', sans-serif;
  color: ${darkNavy};
  background: ${white};
  border: solid 0.8px ${white};
  box-shadow: 0 2pt 4pt rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  font-size: 0.813rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.875rem;
  letter-spacing: normal;
  text-align: center;
`;

export { Button };

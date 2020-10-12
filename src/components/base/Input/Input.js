import styled from 'styled-components';

const Input = styled.input`
  width: 15.5rem;
  height: 2.5rem;
  border-radius: 6px;
  padding: 0.5rem;
  border: none;
  font-size: inherit;
  margin-bottom: 3.5vh;
  font-family: inherit;
  font-weight: 300;
  border: 0.063rem solid transparent;
  box-shadow: 0px 6px 10px rgba(0, 0 , 0, 0.2);
  opacity: 1;

  &:focus {
    outline: none;
    border: 0.063rem solid ${props => props.theme.fgColor};
    font-weight: 400;
    transition: border-color 1s;  
  }

  &::placeholder {
    color: gray;
  }

  &:focus::placeholder {
    transition: opacity 0.5s 0.25s ease;
    opacity: 0;
  }

  &[type='submit'] {
    background: ${props => props.theme.buttonColor};
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 1rem;
    margin-bottom: 3.5rem;

    &:active {
      background: ${props => props.theme.buttonActiveColor};
    }

    &:focus {
      border-color: ${props => props.theme.buttonActiveColor};
    }
  }
`;

export { Input };
import styled from 'styled-components';

const FormGroup = styled.div<{ isDisabled?: boolean }>`
  input,
  textarea,
  select {
    margin: 0.2rem 0;
  }
  textarea,
  select {
    margin-bottom: 1.8rem;
  }
  ${(props) =>
    props.isDisabled && {
      opacity: '0.6',
      cursor: 'default',
    }}
`;

export default FormGroup;

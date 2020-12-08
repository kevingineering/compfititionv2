import React, { useEffect, useState } from 'react';
import FormGroup from './FormGroupStyledComponent';
import styled from 'styled-components';

interface IProps {
  label: string;
  name: string;
  value: string;
  handleInput: (name: string, newValue: string, isValid: boolean) => void;
  isDisabled?: boolean;
  autofocus?: boolean;
}

//Textarea paired with useForm hook
const Textarea: React.FC<IProps> = ({
  label,
  name,
  value,
  handleInput,
  isDisabled = false,
  autofocus = false,
}) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    handleInput(name, state, true);
  }, [name, state, handleInput]);

  return (
    <FormGroup isDisabled={isDisabled}>
      <label htmlFor={name}>{label}</label>
      <TextareaTextarea
        value={state}
        name={name}
        rows={3}
        onChange={(e) => setState(e.target.value)}
        {...(isDisabled && { disabled: true })}
        {...(autofocus && { autofocus: true })}
      />
    </FormGroup>
  );
};

export default Textarea;

const TextareaTextarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 0.125rem solid var(--primary-color);
  background: var(--secondary-color);
  color: var(--primary-color);
`;

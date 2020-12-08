import React, { useState, useEffect } from 'react';
import FormGroup from './FormGroupStyledComponent';
import styled from 'styled-components';

interface IOptions {
  value: string;
  text: string;
}

interface IProps {
  label: string;
  name: string;
  handleInput: (name: string, newValue: string, isValid: boolean) => void;
  options: IOptions[];
  isDisabled?: boolean;
  autofocus?: boolean;
  initialValue?: string;
}

//Select paired with useForm hook
const Select: React.FC<IProps> = ({
  label,
  name,
  handleInput,
  options,
  isDisabled = false,
  autofocus = false,
  initialValue,
}) => {
  const [state, setState] = useState(
    initialValue ? initialValue : options[0].value
  );

  useEffect(() => {
    handleInput(name, state, true);
  }, [name, state, handleInput]);

  let optionsList = options.map((option, index) => {
    return (
      <option value={option.value} key={index}>
        {option.text}
      </option>
    );
  });
  return (
    <FormGroup isDisabled={isDisabled}>
      <label htmlFor={name}>{label}</label>
      <SelectSelect
        value={state}
        name={name}
        onChange={(e) => setState(e.target.value)}
        {...(isDisabled && { disabled: true })}
        {...(autofocus && { autofocus: true })}
      >
        {optionsList}
      </SelectSelect>
    </FormGroup>
  );
};

export default Select;

const SelectSelect = styled.select`
  display: block;
  width: 100%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 0.125rem solid var(--primary-color);
  background: var(--secondary-color);
  color: var(--primary-color);
`;

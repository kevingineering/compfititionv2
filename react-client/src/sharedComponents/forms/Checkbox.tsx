import React, { useEffect, useState } from 'react';
import FormGroup from './FormGroupStyledComponent';
import styled from 'styled-components';

interface IProps {
  label: string;
  name: string;
  message: string;
  handleInput: (name: string, newValue: string, isValid: boolean) => void;
  isChecked?: boolean;
}

//checkbox for use with useForm hook
const Checkbox: React.FC<IProps> = ({
  label,
  name,
  message,
  handleInput,
  isChecked = true,
}) => {
  const [state, setState] = useState(isChecked);
  useEffect(() => {
    handleInput(name, state.toString(), true);
  }, [name, state, handleInput]);

  return (
    <FormGroup>
      <CheckboxLabel>{label}</CheckboxLabel>
      <CheckboxContent>
        <CheckboxBox>
          <input
            name={label}
            type='checkbox'
            onChange={() => setState((prevState) => !prevState)}
            checked={state}
          />
          <CheckboxCheck>
            {/* viewBox=min-x min-y width height */}
            <svg viewBox='0 0 24 24'>
              {/* For path attribute d go to https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Path_commands */}
              <path
                fill='none'
                stroke='currentColor'
                strokeWidth='3'
                d='M3 13 L8 19 L21 4.5'
              />
            </svg>
          </CheckboxCheck>
        </CheckboxBox>
        <CheckboxMessage>{message}</CheckboxMessage>
      </CheckboxContent>
    </FormGroup>
  );
};

export default Checkbox;

const CheckboxMessage = styled.li`
  display: inline-block;
  margin-left: 0.75rem;
  flex: 1;
`;

const CheckboxContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CheckboxLabel = styled.label`
  display: block;
`;

//input:checked + span svg draws check in CheckboxCheck
const CheckboxBox = styled.label`
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + span svg {
    transform: scale(1);
  }
`;

const CheckboxCheck = styled.span`
  display: inline-grid;
  width: 1.6rem;
  height: 1.6rem;
  border: 0.125rem solid var(--primary-color);
  svg {
    transform: scale(0);
  }
`;

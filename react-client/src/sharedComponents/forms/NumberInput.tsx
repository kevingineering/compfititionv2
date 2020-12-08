import React from 'react';
import styled from 'styled-components';

interface IProps {
  message: string;
  value: string;
  handleValue: (value: string) => void;
  units?: string;
}

const NumberInput: React.FC<IProps> = ({
  message,
  value,
  handleValue,
  units,
}) => {
  //verify is number
  //if empty do not record
  //otherwise handleValue
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pattern = /^\d{1,8}(?:()|(\.\d{0,2}))$/;
    if (!pattern.test(event.target.value) && !(event.target.value === '')) {
      return null;
    }
    handleValue(event.target.value);
  };

  return (
    <InputContainer>
      <InputName>
        <strong>{message}</strong>
      </InputName>
      <span>
        <InputValue
          value={value}
          name='today'
          onChange={handleChange}
          autoComplete='off'
        />
        {units}
      </span>
    </InputContainer>
  );
};

export default NumberInput;

const InputContainer = styled.p`
  text-align: center;
  margin: 0.2rem;
`;

const InputName = styled.span`
  width: 6rem;
  flex-shrink: 0;
  display: inline-block;
  text-align: left;
`;

const InputValue = styled.input`
  color: var(--primary-color);
  background: var(--secondary-color);
  width: 3rem;
  border: 0.0625rem solid var(--primary-color);
  margin: 0 0.4rem;
  font-size: 1rem;
  text-align: center;
`;

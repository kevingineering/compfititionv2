import React, { useState, useEffect } from 'react';

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

  let optionsList = options.map((option) => {
    return (
      <option value={option.value} key={option.value}>
        {option.text}
      </option>
    );
  });
  return (
    <div className={`form-group ${isDisabled && 'disabled'}`}>
      <label htmlFor={name}>{label}</label>
      <select
        className='form-no-error'
        value={state}
        name={name}
        onChange={(e) => setState(e.target.value)}
        {...(isDisabled && { disabled: true })}
        {...(autofocus && { autofocus: true })}
      >
        {optionsList}
      </select>
    </div>
  );
};

export default Select;

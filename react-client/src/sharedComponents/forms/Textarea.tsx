import React, { useEffect, useState } from 'react';

interface IProps {
  label: string;
  name: string;
  value: string;
  handleInput: (name: string, newValue: string, isValid: boolean) => void;
  disabled?: boolean;
  autofocus?: boolean;
}

//Textarea paired with useForm hook
const Textarea: React.FC<IProps> = ({
  label,
  name,
  value,
  handleInput,
  disabled = false,
  autofocus = false,
}) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    handleInput(name, state, true);
  }, [name, state, handleInput]);

  return (
    <div className={`form-group ${disabled && 'disabled'}`}>
      <label htmlFor={name}>{label}</label>
      <textarea
        className='form-no-error'
        value={state}
        name={name}
        rows={3}
        onChange={(e) => setState(e.target.value)}
        {...(disabled && { disabled: true })}
        {...(autofocus && { autofocus: true })}
      />
    </div>
  );
};

export default Textarea;

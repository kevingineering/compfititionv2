import React, { useEffect, useState } from 'react';

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
    <div className='form-group'>
      <label className='block'>{label}</label>
      <label className='checkbox'>
        <span className='checkbox-input'>
          <input
            name={label}
            type='checkbox'
            onChange={() => setState((prevState) => !prevState)}
            checked={state}
          />
          <span className='checkbox-control'>
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
          </span>
        </span>
      </label>
      <li className='register-span'>{message}</li>
    </div>
  );
};

export default Checkbox;

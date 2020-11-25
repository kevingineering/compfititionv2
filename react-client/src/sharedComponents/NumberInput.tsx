import React from 'react';

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
    <p className='table-info center'>
      <span className='width-6rem'>
        <strong>{message}</strong>
      </span>
      <span>
        <input
          className='center chart-input'
          type='text'
          value={value}
          name='today'
          onChange={handleChange}
          autoComplete='off'
        />
        {units}
      </span>
    </p>
  );
};

export default NumberInput;

import React, { useReducer, useEffect } from 'react';
import { validate, IValidator } from '../../util/validators';
import FormGroup from './FormGroupStyledComponent';
import styled from 'styled-components';

//custom input for use with validators and useForm hook

interface IInputState {
  value: string;
  isValid: boolean;
  errorMessage: string;
  isTouched: boolean;
}

interface IInputAction {
  type: string;
  value: string;
  validators: IValidator[];
  name: string;
}

const inputReducer = (state: IInputState, action: IInputAction) => {
  switch (action.type) {
    case 'CHANGE':
      let { isValid, errorMessage } = validate(
        action.value,
        action.validators,
        action.name
      );
      return {
        ...state,
        value: action.value,
        isValid,
        errorMessage,
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

interface IProps {
  label: string;
  type?: string;
  value: string;
  name: string;
  handleInput: (name: string, newValue: string, isValid: boolean) => void;
  validators: IValidator[];
  min?: number;
  max?: number;
  isDisabled?: boolean;
  autofocus?: boolean;
  isValid: boolean;
  //string to display in error messages instead of name
  alias?: string;
  //rechecks validation, useful when validity depends on another Input's value (e.g. password match)
  isRevalidate?: boolean;
  //limits what user can enter
  pattern?: RegExp;
}

const Input: React.FC<IProps> = ({
  label,
  type = 'text',
  value = '',
  name,
  handleInput,
  validators,
  min,
  max,
  isDisabled = false,
  autofocus = false,
  isValid = false,
  alias = undefined,
  isRevalidate = false,
  pattern = null,
}) => {
  const initialState: IInputState = {
    value: value,
    isValid: isValid,
    isTouched: false,
    errorMessage: '',
  };

  const [state, dispatch] = useReducer(inputReducer, initialState);

  useEffect(() => {
    handleInput(name, state.value, state.isValid);
  }, [name, state.value, state.isValid, handleInput]);

  useEffect(() => {
    dispatch({
      type: 'CHANGE',
      value: state.value,
      validators: validators,
      name: alias ? alias : name,
    });
    //eslint-disable-next-line
  }, [isRevalidate]);

  const handleChange = (event: any) => {
    if (
      pattern &&
      !pattern.test(event.target.value) &&
      !(event.target.value === '')
    )
      return null;
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: validators,
      name: alias ? alias : name,
    });
  };

  const handleTouch = () => {
    dispatch({
      type: 'TOUCH',
      value: '',
      validators: [],
      name: '',
    });
  };

  return (
    <FormGroup isDisabled={isDisabled}>
      <label htmlFor={name}>{label}</label>
      <InputInput
        type={type}
        value={state.value}
        name={name}
        onChange={handleChange}
        onBlur={handleTouch}
        {...(min && { min: min })}
        {...(max && { max: max })}
        {...(isDisabled && { disabled: true })}
        {...(autofocus && { autofocus: true })}
        spellCheck='false'
      />
      {
        <InvalidMessage>
          {state.isTouched ? state.errorMessage : ''}
        </InvalidMessage>
      }
    </FormGroup>
  );
};

export default Input;

const InputInput = styled.input`
  margin-bottom: 1.2rem;
  display: block;
  width: 100%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 0.125rem solid var(--primary-color);
  background: var(--secondary-color);
  color: var(--primary-color);
  ${(props) =>
    props.type === 'datetime-local' &&
    `::-webkit-datetime-edit-month-field:focus,
    ::-webkit-datetime-edit-day-field:focus,
    ::-webkit-datetime-edit-year-field:focus,
    ::-webkit-datetime-edit-hour-field:focus,
    ::-webkit-datetime-edit-minute-field:focus,
    ::-webkit-datetime-edit-ampm-field:focus {
      background-color: var(--today-color);
    }
    
    ::-webkit-calendar-picker-indicator {
      display: none;
    }`}
`;

const InvalidMessage = styled.p`
  min-height: 1.6rem;
  font-size: 0.8rem;
  color: var(--danger-color);
`;

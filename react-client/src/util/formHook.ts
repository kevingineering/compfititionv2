import { useCallback, useReducer } from 'react';

/* Custom useForm hook
  takes an initial state
  returns:
    formState: current state of form
    handleInput: function to change single form input
    setFormState: function to set/reset form state
    createFormObject: function that creates aggregated object with all parsed form inputs
*/

//#region TYPES

//all inputs are strings, this is type to parse individual form input string as
export enum EFormInputType {
  string,
  number,
  boolean,
}

//individual form input
export class FormInput {
  value: string;
  isValid: boolean;
  type: EFormInputType;

  constructor(value?: string, isValid?: boolean, type?: EFormInputType) {
    this.value = value || '';
    this.isValid = isValid || false;
    this.type = type || EFormInputType.string;
  }
}

//aggregate of form inputs
interface IFormState {
  inputs: Map<string, FormInput>;
  isValid: boolean;
}

//ACTION TYPES
const INPUT = 'INPUT';
const CHANGE = 'CHANGE';

//for updating single input
interface IInput {
  type: typeof INPUT;
  name: string;
  isValid: boolean;
  value: string;
}

//for changing many inputs
interface IChange {
  type: typeof CHANGE;
  valuesMap: Map<string, FormInput>;
  isValid: boolean;
}

type TActionTypes = IInput | IChange;

//#endregion

//#region REDUCER

const formReducer = (state: IFormState, action: TActionTypes) => {
  let formIsValid = true;
  switch (action.type) {
    //when individual input changes
    case INPUT:
      state.inputs.forEach((keyValue, key) => {
        if (key === action.name) {
          keyValue.isValid = action.isValid;
          keyValue.value = action.value;
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs.get(key)!.isValid;
        }
      });

      return { inputs: state.inputs, isValid: formIsValid };
    // when form inputs are initialized or changed
    case CHANGE:
      return {
        inputs: action.valuesMap,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

//#endregion

//#region ACTIONS
export const useForm = (initialState: IFormState) => {
  //useCallback avoids infinite loop by defining when function should rerender
  //with no dependencies, function is not recreated when React rerenders
  const [formState, dispatch] = useReducer(formReducer, initialState);

  //when an individual form value changes
  const handleInput = useCallback(
    (name: string, newValue: string, isValid: boolean) => {
      dispatch({
        type: 'INPUT',
        value: newValue,
        isValid: isValid,
        name: name,
      });
    },
    []
  );

  //when form inputs are initialized or changed
  const setFormState = useCallback((inputData: Map<string, FormInput>) => {
    let initialValidity = true;
    inputData.forEach(
      (value) => (initialValidity = value.isValid && initialValidity)
    );
    dispatch({
      type: CHANGE,
      valuesMap: inputData,
      isValid: initialValidity,
    });
  }, []);

  //creates object from form values - parses values to their given type
  const createFormObject = () => {
    const formObject = {} as any;
    formState.inputs.forEach((keyValue, key) => {
      switch (keyValue.type) {
        case EFormInputType.string:
          formObject[key] = keyValue.value;
          break;
        case EFormInputType.boolean:
          formObject[key] = keyValue.value === 'true' ? true : false;
          break;
        case EFormInputType.number:
          formObject[key] = parseFloat(keyValue.value);
          break;
        default:
          break;
      }
    });
    return formObject;
  };

  return { formState, handleInput, setFormState, createFormObject };
};

//#endregion

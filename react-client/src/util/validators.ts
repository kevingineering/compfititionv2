import { dateIsBeforeToday, dateIsAfter2100 } from './dateFunctions';

export interface IValidator {
  type: string;
  value: number | string;
}

//validation function
export const validate = (
  inputValue: string,
  validators: IValidator[],
  name: string
) => {
  let isValid = true;
  let errorMessage = '';
  let title = name[0].toUpperCase() + name.slice(1);
  for (const item of validators) {
    switch (item.type) {
      case 'REQUIRE':
        if (isValid && inputValue.trim().length === 0) {
          isValid = false;
          errorMessage = title + ' is required.';
          return { isValid, errorMessage };
        }
        break;
      case 'EMAIL':
        if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValue)) {
          isValid = false;
          errorMessage = title + ' must be a valid email address.';
          return { isValid, errorMessage };
        }
        break;
      case 'PASSWORD':
        if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
            inputValue
          )
        ) {
          isValid = false;
          errorMessage =
            'Uppercase, lowercase, numeric, and special characters are required.';
          return { isValid, errorMessage };
        }
        break;
      case 'MINLENGTH':
        if (inputValue.trim().length < item.value!) {
          isValid = false;
          errorMessage = `${title} must have at least ${item.value} characters.`;
          return { isValid, errorMessage };
        }
        break;
      case 'MAXLENGTH':
        if (inputValue.trim().length > item.value!) {
          isValid = false;
          errorMessage = `${title} cannot have more than ${item.value} characters.`;
          return { isValid, errorMessage };
        }
        break;
      case 'MIN':
        if (+inputValue < item.value!) {
          isValid = false;
          errorMessage = `${title} cannot be less than ${item.value}.`;
          return { isValid, errorMessage };
        }
        break;
      case 'MAX':
        if (+inputValue > item.value!) {
          isValid = false;
          errorMessage = `${title} cannot be greater than ${item.value}.`;
          return { isValid, errorMessage };
        }
        break;
      case 'MATCH':
        if (inputValue !== item.value) {
          isValid = false;
          errorMessage = `Passwords must match.`;
          return { isValid, errorMessage };
        }
        break;
      case 'DATENOTPAST':
        if (dateIsBeforeToday(inputValue)) {
          isValid = false;
          errorMessage = `${title} cannot be in the past.`;
          return { isValid, errorMessage };
        }
        break;
      case 'DATENOTAFTER2100':
        if (dateIsAfter2100(inputValue)) {
          isValid = false;
          errorMessage = `${title} cannot be after 2100.`;
          return { isValid, errorMessage };
        }
        break;
      case 'DURATIONNOTPAST':
        if (item.value >= inputValue) {
          isValid = false;
          errorMessage = `End of goal cannot be in the past.`;
          return { isValid, errorMessage };
        }
        break;
      case 'WHOLEWEEK':
        if (+inputValue % 7 !== 0) {
          errorMessage = `Duration will be rounded up to ${
            +inputValue - (+inputValue % 7) + 7
          } to use whole week.`;
          return { isValid, errorMessage };
        }
        break;
      default:
        break;
    }
  }
  return { isValid, errorMessage };
};

//functions that create validators
export const VALIDATOR_REQUIRE = (): IValidator => ({
  type: 'REQUIRE',
  value: '',
});
export const VALIDATOR_MINLENGTH = (value: number): IValidator => ({
  type: 'MINLENGTH',
  value: value,
});
export const VALIDATOR_MAXLENGTH = (value: number): IValidator => ({
  type: 'MAXLENGTH',
  value: value,
});
export const VALIDATOR_MIN = (value: number): IValidator => ({
  type: 'MIN',
  value: value,
});
export const VALIDATOR_MAX = (value: number): IValidator => ({
  type: 'MAX',
  value: value,
});
export const VALIDATOR_EMAIL = (): IValidator => ({
  type: 'EMAIL',
  value: '',
});
export const VALIDATOR_PASSWORD = (): IValidator => ({
  type: 'PASSWORD',
  value: '',
});
export const VALIDATOR_MATCH = (value: string): IValidator => ({
  type: 'MATCH',
  value: value,
});
export const VALIDATOR_DATE_NOT_PAST = (value: string): IValidator => ({
  type: 'DATENOTPAST',
  value: value,
});
export const VALIDATOR_DATE_NOT_AFTER_2100 = (value: string): IValidator => ({
  type: 'DATENOTAFTER2100',
  value: value,
});
export const VALIDATOR_DURATION_NOT_PAST = (value: number): IValidator => ({
  type: 'DURATIONNOTPAST',
  value: value,
});
export const VALIDATOR_WHOLE_WEEK = (): IValidator => ({
  type: 'WHOLEWEEK',
  value: '',
});

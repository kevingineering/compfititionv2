import React from 'react';
import { FormInput, useForm } from '../../../util/formHook';
import { useDispatch } from 'react-redux';
import Input from '../../../sharedComponents/forms/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD,
  VALIDATOR_MATCH,
} from '../../../util/validators';
import { ChangePassword } from '../../../redux/user/actions';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import {
  StandardContainer,
  StandardForm,
} from '../../../sharedComponents/styledComponents/Misc';

interface IProps {
  closePassword: () => void;
  isLoading: boolean;
}

//allows user to change password
const PasswordModule: React.FC<IProps> = ({ closePassword, isLoading }) => {
  const dispatch = useDispatch();

  //initial state for useForm hook
  const formValues: Map<string, FormInput> = new Map([
    ['oldPassword', new FormInput()],
    ['newPassword', new FormInput()],
    ['newPassword2', new FormInput()],
  ]);

  //custom hook
  const { handleInput, formState } = useForm({
    inputs: formValues,
    isValid: false,
  });

  const handleSubmit = () => {
    if (isPasswordMatch) {
      dispatch(
        ChangePassword({
          oldPassword: formState.inputs.get('oldPassword')!.value,
          newPassword: formState.inputs.get('newPassword2')!.value,
        })
      );
    }
  };

  const isPasswordMatch =
    formState.inputs.get('newPassword')?.value ===
    formState.inputs.get('newPassword2')?.value;

  return (
    <StandardContainer>
      <StandardForm autoComplete='off'>
        <Input
          label='Current Password'
          type='password'
          value={formState.inputs.get('oldPassword')!.value}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(8),
            VALIDATOR_PASSWORD(),
          ]}
          name='oldPassword'
          alias='Current password'
          handleInput={handleInput}
          isValid={formState.inputs.get('oldPassword')!.isValid}
        />
        <Input
          label='New Password'
          type='password'
          value={formState.inputs.get('newPassword')!.value}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(8),
            VALIDATOR_PASSWORD(),
          ]}
          name='newPassword'
          alias='New password'
          handleInput={handleInput}
          isValid={formState.inputs.get('newPassword')!.isValid}
        />
        <Input
          label='Confirm New Password'
          type='password'
          value={formState.inputs.get('newPassword2')!.value}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(8),
            VALIDATOR_PASSWORD(),
            VALIDATOR_MATCH(formState.inputs.get('newPassword')!.value),
          ]}
          name='newPassword2'
          alias='New password confirmation'
          handleInput={handleInput}
          isValid={formState.inputs.get('newPassword2')!.isValid}
        />
        <LoadingButton
          isLoading={isLoading}
          handleClick={handleSubmit}
          message='Change Password'
          isDisabled={!formState.isValid || !isPasswordMatch || isLoading}
        />
      </StandardForm>
      <LoadingButton
        message='Cancel'
        handleClick={closePassword}
        isDisabled={isLoading}
      />
    </StandardContainer>
  );
};

export default PasswordModule;

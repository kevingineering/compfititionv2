import React from 'react';
import { StandardContainer } from '../../sharedComponents/styledComponents/Misc';
import styled from 'styled-components';
import Checkbox from '../../sharedComponents/forms/Checkbox';
import LoadingButton from '../../sharedComponents/forms/LoadingButton';
import Input from '../../sharedComponents/forms/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MATCH,
} from '../../util/validators';
import {
  StandardForm,
  PageTitle,
} from '../../sharedComponents/styledComponents/Misc';
import { IFormState } from '../../util/formHook';

interface IProps {
  handleInput: (name: string, newValue: string, isValid: boolean) => void;
  handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
  handleLoginToggle: () => void;
  formState: IFormState;
  isPasswordMatch: boolean;
  isLogin: boolean;
  isLoading: boolean;
}
const AuthPageJSX: React.FC<IProps> = ({
  handleInput,
  handleSubmit,
  handleLoginToggle,
  formState,
  isLogin,
  isPasswordMatch,
  isLoading,
}) => {
  return (
    <AuthContainer>
      <PageTitle>Account {isLogin ? 'Login' : 'Register'}</PageTitle>
      <StandardForm autoComplete='off'>
        {!isLogin && (
          <Input
            label='Name'
            type='text'
            value={formState.inputs.get('name')!.value}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
            name='name'
            handleInput={handleInput}
            isValid={formState.inputs.get('name')!.isValid}
          />
        )}
        <Input
          label='Email Address'
          type='email'
          value={formState.inputs.get('email')!.value}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_EMAIL(),
            VALIDATOR_MAXLENGTH(50),
          ]}
          name='email'
          handleInput={handleInput}
          isValid={formState.inputs.get('email')!.isValid}
        />
        <Input
          label='Password'
          type='password'
          value={formState.inputs.get('password')!.value}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(8),
            VALIDATOR_PASSWORD(),
          ]}
          name='password'
          handleInput={handleInput}
          isValid={formState.inputs.get('password')!.isValid}
        />
        {!isLogin && (
          <React.Fragment>
            <Input
              label='Confirm Password'
              type='password'
              value={formState.inputs.get('confirmPassword')!.value}
              validators={[
                VALIDATOR_REQUIRE(),
                VALIDATOR_MINLENGTH(8),
                VALIDATOR_PASSWORD(),
                VALIDATOR_MATCH(formState.inputs.get('password')!.value),
              ]}
              name='confirmPassword'
              handleInput={handleInput}
              isValid={formState.inputs.get('confirmPassword')!.isValid}
              alias='Password confirmation'
              isRevalidate={!isPasswordMatch}
            />
            <Checkbox
              name='isSearchable'
              label='Privacy'
              message='Users are allowed to search for my name and email so they can add me as a friend.'
              handleInput={handleInput}
            />
          </React.Fragment>
        )}
        <LoadingButton
          isLoading={isLoading}
          isDisabled={!formState.isValid || !isPasswordMatch}
          message={isLogin ? 'Login' : 'Register'}
          handleClick={handleSubmit}
        />
      </StandardForm>
      <LoadingButton
        message={isLogin ? 'Not a member? Register' : 'Already joined? Login'}
        handleClick={handleLoginToggle}
        isDisabled={isLoading}
      />
    </AuthContainer>
  );
};

export default AuthPageJSX;

const AuthContainer = styled(StandardContainer)`
  max-width: 25rem;
`;

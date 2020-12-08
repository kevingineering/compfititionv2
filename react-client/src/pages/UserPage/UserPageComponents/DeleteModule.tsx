import React from 'react';
import { FormInput, useForm } from '../../../util/formHook';
import { useDispatch } from 'react-redux';
import Input from '../../../sharedComponents/forms/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD,
} from '../../../util/validators';
import { DeleteUser } from '../../../redux/user/actions';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import {
  StandardContainer,
  StandardForm,
} from '../../../sharedComponents/styledComponents/Misc';
import styled from 'styled-components';

interface IProps {
  closeDelete: () => void;
  isLoading: boolean;
}

//allows user to delete profile
const DeleteModule: React.FC<IProps> = ({ closeDelete, isLoading }) => {
  const dispatch = useDispatch();

  const formValues: Map<string, FormInput> = new Map([
    ['password', new FormInput()],
  ]);

  const { handleInput, formState } = useForm({
    inputs: formValues,
    isValid: false,
  });

  const handleSubmit = () => {
    dispatch(DeleteUser(formState.inputs.get('password')!.value));
  };

  return (
    <StandardContainer>
      <StandardForm autoComplete='off'>
        <DeleteAccountMessage>
          Deleting your account cannot be undone and your information cannot be
          recovered. Any goals, competitions, or friendships you have will be
          permanently lost. Are you sure you want to delete your account?
        </DeleteAccountMessage>
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
        <LoadingButton
          isLoading={isLoading}
          handleClick={handleSubmit}
          message='Delete Account'
          isDisabled={!formState.isValid}
        />
      </StandardForm>
      <LoadingButton
        message='Cancel'
        isDisabled={isLoading}
        handleClick={closeDelete}
      />
    </StandardContainer>
  );
};

export default DeleteModule;

const DeleteAccountMessage = styled.p`
  margin-bottom: 1rem;
`;

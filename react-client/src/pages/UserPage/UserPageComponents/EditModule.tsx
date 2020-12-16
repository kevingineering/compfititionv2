import React from 'react';
import { FormInput, useForm, EFormInputType } from '../../../util/formHook';
import { useDispatch } from 'react-redux';
import Input from '../../../sharedComponents/forms/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_PASSWORD,
} from '../../../util/validators';
import { IUserState } from '../../../redux/user/reducer';
import Checkbox from '../../../sharedComponents/forms/Checkbox';
import { UpdateUser } from '../../../redux/user/actions';
import LoadingButton from '../../../sharedComponents/forms/LoadingButton';
import { TUpdateRequest } from '../../../redux/Models';
import { UPDATE_USER_BUTTON } from '../../../redux/buttonTypes';
import {
  StandardContainer,
  StandardForm,
} from '../../../sharedComponents/styledComponents/Misc';

interface IProps {
  userState: IUserState;
  closeEdit: () => void;
}

//allows user to update information
const EditModule: React.FC<IProps> = ({ userState, closeEdit }) => {
  const dispatch = useDispatch();

  //initial state for useForm hook
  const formValues: Map<string, FormInput> = new Map([
    ['name', new FormInput(userState.user!.name!, true, EFormInputType.string)],
    [
      'email',
      new FormInput(userState.user!.email!, true, EFormInputType.string),
    ],
    ['password', new FormInput()],
    [
      'isSearchable',
      new FormInput(
        userState.user!.isSearchable! ? 'true' : 'false',
        true,
        EFormInputType.boolean
      ),
    ],
  ]);

  //custom hook
  const { handleInput, formState, createFormObject } = useForm({
    inputs: formValues,
    isValid: false,
  });

  const handleSubmit = () => {
    const updateDTO: TUpdateRequest = createFormObject();
    dispatch(UpdateUser(updateDTO));
  };

  let isLoading = userState.loadingButton === UPDATE_USER_BUTTON;

  return (
    <StandardContainer>
      <StandardForm autoComplete='off'>
        <Input
          label='Name'
          type='text'
          value={formState.inputs.get('name')!.value}
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(4),
            VALIDATOR_MAXLENGTH(20),
          ]}
          name='name'
          handleInput={handleInput}
          isValid={formState.inputs.get('name')!.isValid}
        />
        <Input
          label='Email Address'
          type='email'
          value={formState.inputs.get('email')!.value}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          name='email'
          handleInput={handleInput}
          isValid={formState.inputs.get('email')!.isValid}
        />
        <Checkbox
          name='isSearchable'
          label={'Privacy'}
          message={
            'Users are allowed to search for my name and email so they can add me as a friend.'
          }
          handleInput={handleInput}
          isChecked={userState.user!.isSearchable!}
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
        <LoadingButton
          handleClick={handleSubmit}
          message='Save User'
          isLoading={isLoading}
          isDisabled={!formState.isValid || isLoading}
        />
      </StandardForm>
      <LoadingButton
        message='Cancel'
        isDisabled={isLoading}
        handleClick={closeEdit}
      />
    </StandardContainer>
  );
};

export default EditModule;

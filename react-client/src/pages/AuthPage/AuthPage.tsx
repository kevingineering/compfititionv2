import React, { useEffect, useState, useMemo } from 'react';
import Input from '../../sharedComponents/forms/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MATCH,
} from '../../util/validators';
import { useForm, FormInput, EFormInputType } from '../../util/formHook';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootStore } from '../../redux/Store';
import { RegisterUser, LoginUser } from '../../redux/user/actions';
import Checkbox from '../../sharedComponents/forms/Checkbox';
import LoadingButton from '../../sharedComponents/forms/LoadingButton';
import { TLoginDTO, TRegisterDTO } from '../../redux/DTOs';
import { ClearAlert } from '../../redux/alert/actions';
import { LOGIN_OR_REGISTER_BUTTON } from '../../redux/buttonTypes';

//both login and register page
const AuthPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const userState = useSelector((state: RootStore) => state.userState);
  const [isLogin, setIsLogin] = useState(true);

  //Go to user home page ('/') if token exists in local storage
  useEffect(() => {
    if (userState.isAuthenticated) {
      console.log('redirect from not auth page');
      history.push('/');
    }
  }, [userState.isAuthenticated, history]);

  //initial state for useForm hook
  const formValues: Map<string, FormInput> = useMemo(() => {
    return new Map([
      ['email', new FormInput()],
      ['password', new FormInput()],
    ]);
  }, []);

  //custom useForm hook
  const { handleInput, formState, setFormState, createFormObject } = useForm({
    inputs: formValues,
    isValid: false,
  });

  //toggle between login and register and update form state
  const handleLoginToggle = () => {
    let formValues = formState.inputs;
    //isLogin === true means toggling to register
    if (isLogin) {
      formValues.set('name', new FormInput());
      formValues.set('confirmPassword', new FormInput());
      formValues.set(
        'isSearchable',
        new FormInput('true', true, EFormInputType.boolean)
      );
    } else {
      formValues.delete('name');
      formValues.delete('confirmPassword');
      formValues.delete('isSearchable');
    }
    setFormState(formValues);
    setIsLogin((prevState) => !prevState);
  };

  //attempted login/registration
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(ClearAlert());
    if (isLogin) {
      const object: TLoginDTO = createFormObject();
      dispatch(LoginUser(object));
    } else if (isPasswordMatch) {
      const object: TRegisterDTO = createFormObject();
      dispatch(RegisterUser(object));
    }
  };

  const isPasswordMatch = isLogin
    ? true
    : formState.inputs.get('password')?.value ===
      formState.inputs.get('confirmPassword')?.value;

  const isLoading = userState.loadingButton === LOGIN_OR_REGISTER_BUTTON;

  //fields vary depending on login / register
  return (
    <div className='login-container'>
      <h1>Account {isLogin ? 'Login' : 'Register'}</h1>
      <form autoComplete='off' className='form'>
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
              label={'Privacy'}
              message={
                'Users are allowed to search for my name and email so they can add me as a friend.'
              }
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
      </form>
      <LoadingButton
        message={isLogin ? 'Not a member? Register' : 'Already joined? Login'}
        handleClick={handleLoginToggle}
        isDisabled={isLoading}
      />
    </div>
  );
};

export default AuthPage;

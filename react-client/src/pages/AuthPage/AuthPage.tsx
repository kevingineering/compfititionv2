import React, { useEffect, useState, useMemo } from 'react';
import { useForm, FormInput, EFormInputType } from '../../util/formHook';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootStore } from '../../redux/Store';
import { RegisterUser, LoginUser } from '../../redux/user/actions';
import { TLoginRequest, TRegisterRequest } from '../../redux/Models';
import { ClearAlert } from '../../redux/alert/actions';
import { LOGIN_OR_REGISTER_BUTTON } from '../../redux/buttonTypes';
import AuthPageJSX from './AuthPageJSX';

//both login and register page
const AuthPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const userState = useSelector((state: RootStore) => state.userState);
  const [isLogin, setIsLogin] = useState(true);

  //Go to user home page ('/') if token exists in local storage
  useEffect(() => {
    if (userState.isAuthenticated) {
      console.log('redirect from auth page');
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
      const object: TLoginRequest = createFormObject();
      dispatch(LoginUser(object));
    } else if (isPasswordMatch) {
      const object: TRegisterRequest = createFormObject();
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
    <AuthPageJSX
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      handleLoginToggle={handleLoginToggle}
      formState={formState}
      isLogin={isLogin}
      isPasswordMatch={isPasswordMatch}
      isLoading={isLoading}
    />
  );
};

export default AuthPage;

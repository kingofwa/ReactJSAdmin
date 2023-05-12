import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '@api/auth';
import { login } from '@store/user';
import { PATHS } from '@config/paths';
import { CustomForm, EmailInput, PasswordInput } from '@components/form';
import { SubmitButton } from '@components/buttons';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import { MESSAGE_TYPE, USER_ROLE } from '@config/constants';
import './index.scss';

const LoginPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async values => {
    try {
      setSubmitting(true);
      const credentials = await signIn(values);
      if (credentials?.role === USER_ROLE.SUPER_ADMIN) {
        dispatch(login(credentials));
        history.push(PATHS.dashboard);
      } else if (credentials?.role === USER_ROLE.BUSINESS) {
        dispatch(login(credentials));
        history.push(PATHS.business.dashboard);
      } else {
        pushMessage(MESSAGES.loginErr, MESSAGE_TYPE.ERROR);
      }
    } catch (error) {
      pushMessage(MESSAGES.loginErr, MESSAGE_TYPE.ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <h1 className="login-title">みんラリ運営管理画面</h1>
      <div className="login-container">
        <CustomForm
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          loading={submitting}
          className="login-form"
        >
          <p className="login-form-title">ログイン</p>
          <EmailInput />
          <PasswordInput />
          <SubmitButton text="ログインする" className="btn-primary" />
        </CustomForm>
      </div>
    </div>
  );
};

export default LoginPage;

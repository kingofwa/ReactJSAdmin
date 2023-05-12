import React, { useState } from 'react';
import {
  CustomForm,
  TextInput,
  PasswordInput,
  ConfirmPasswordInput
} from '@components/form';
import { SubmitButton } from '@components/buttons';
import { message } from 'antd';
import { resetPasswordBusiness } from '@api/business';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import { useHistory } from 'react-router-dom';
import { PATHS } from '@config/paths';
import './index.scss';

const ResetPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

  const onFinish = async values => {
    try {
      setSubmitting(true);
      const params = values;
      await resetPasswordBusiness(params);
      pushMessage(MESSAGES.saveSuccessfully);
      history.push(PATHS.business.login);
    } catch (error) {
      message.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reset-password">
      <h1 className="reset-password__title">パスワード再設定 </h1>
      <div className="reset-password__container">
        <div className="reset-password__sub-title">
          ご登録いただいたメールアドレスに確認コードを記載したメールを送りました。
          <br />
          メールをご確認いただき、確認コードと新しいパスワードを入力してください。
        </div>
        <CustomForm
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          loading={submitting}
          className="reset-password__form"
        >
          <TextInput label="確認コード" name="reset_password_token" required />
          <PasswordInput label="新しいパスワード" />
          <ConfirmPasswordInput
            label="新しいパスワード(確認)"
            name="password_confirmation"
          />
          <SubmitButton text="パスワードを変更する" className="btn-primary" />
        </CustomForm>
      </div>
    </div>
  );
};

export default ResetPassword;

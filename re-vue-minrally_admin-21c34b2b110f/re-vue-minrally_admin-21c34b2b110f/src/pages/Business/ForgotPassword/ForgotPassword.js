import React, { useState } from 'react';
import { CustomForm, EmailInput } from '@components/form';
import { SubmitButton } from '@components/buttons';
import { message } from 'antd';
import { forgotPasswordBusiness } from '@api/business';
import { useHistory } from 'react-router-dom';
import { PATHS } from '@config/paths';
import './index.scss';

const ForgotPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

  const onFinish = async values => {
    try {
      setSubmitting(true);
      const params = values;
      await forgotPasswordBusiness(params);
      history.push(PATHS.business.resetPassword);
    } catch (error) {
      message.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="forgot-password">
      <h1 className="forgot-password__title">パスワード再設定</h1>
      <div className="forgot-password__container">
        <div className="forgot-password__sub-title">
          メールアドレスを入力してください。
          <br />
          （メールアドレスが登録されているアカウントのみご利用いただきます。）
        </div>
        <CustomForm
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          loading={submitting}
          className="forgot-password__form"
        >
          <EmailInput />
          <SubmitButton text="送信する" className="btn-primary" />
        </CustomForm>
      </div>
    </div>
  );
};

export default ForgotPassword;

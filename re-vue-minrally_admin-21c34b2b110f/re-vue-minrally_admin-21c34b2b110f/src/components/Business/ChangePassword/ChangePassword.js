import React from 'react';
import { CustomForm } from '@components/form';
import { SubmitButton } from '@components/buttons';
import PasswordInput from '@components/form/PasswordInput';
import { Form } from 'antd';
import './styles.scss';

const formName = 'business-change-password';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};

const ChangePassword = ({ onSubmit = () => {}, disabled }) => {
  const [form] = Form.useForm();

  return (
    <div className="business-change-password">
      <div className="business-change-password__title">
        管理画面ログイン情報
      </div>
      <div className="business-change-password__body">
        <CustomForm
          {...formItemLayout}
          name={formName}
          autoComplete="off"
          onFinish={onSubmit}
          form={form}
        >
          <PasswordInput name="current_password" label="現在のパスワード" />
          <PasswordInput name="password" label="新しいパスワード" />
          <PasswordInput
            name="password_confirmation"
            label="新しいパスワード（確認）"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('パスワードが一致しません'));
                }
              })
            ]}
          />
          <div className="business-change-password__actions">
            <SubmitButton text="更新" disabled={disabled} />
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default ChangePassword;

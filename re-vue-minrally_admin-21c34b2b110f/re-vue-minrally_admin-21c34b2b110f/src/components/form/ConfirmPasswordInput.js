import React from 'react';
import { Form, Input } from 'antd';
import { REGEX_PASSWORD } from '@utils/validate';
import { ERROR_MESSAGES } from '@config/messages';

const ConfirmPasswordInput = ({
  name = 'password_confirmation',
  label = 'パスワード',
  note = '',
  required = true,
  placeholder = '',
  rules = []
}) => {
  const labelName = `${label}${note}`;
  return (
    <Form.Item
      label={labelName}
      name={name}
      placeholder={placeholder}
      rules={[
        { required, message: ERROR_MESSAGES.empty },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject('入力した 2 つのパスワードが一致しません');
          }
        })
      ]}
      className="password-input"
    >
      <Input.Password placeholder={placeholder} autoComplete="off" />
    </Form.Item>
  );
};

export default ConfirmPasswordInput;

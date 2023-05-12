import React from 'react';
import { Form, Input } from 'antd';
import { REGEX_PASSWORD } from '@utils/validate';
import { ERROR_MESSAGES } from '@config/messages';

const PasswordInput = ({
  name = 'password',
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
        {
          pattern: REGEX_PASSWORD,
          message: ERROR_MESSAGES.invalidPassword
        },
        ...rules
      ]}
      className="password-input"
    >
      <Input.Password placeholder={placeholder} autoComplete="off" />
    </Form.Item>
  );
};

export default PasswordInput;

import React from 'react';
import { Form, Input } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';

const EmailInput = ({
  name = 'email',
  label = 'メールアドレス',
  required = true,
  placeholder = ''
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue=""
      rules={[
        { required, message: ERROR_MESSAGES.empty },
        { type: 'email' },
        {
          max: 254,
          message: ERROR_MESSAGES.maxLength.replace(/:count/, 254)
        }
      ]}
      className="email-input"
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default EmailInput;

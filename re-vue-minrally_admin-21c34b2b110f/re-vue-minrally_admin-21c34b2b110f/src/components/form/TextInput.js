import React from 'react';
import { Form, Input } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import './TextInput.scss';

const TextInput = ({
  name = 'input',
  required = false,
  disabled = false,
  inputProps = {},
  readOnly = false,
  initialValue = '',
  rules = [],
  placeholder = '',
  ...rest
}) => {
  return (
    <>
      <Form.Item
        initialValue={initialValue}
        rules={[...[{ required, message: ERROR_MESSAGES.empty }], ...rules]}
        name={name}
        {...rest}
        className={`${readOnly && 'text-input-read-only'} text-input`}
      >
        <Input {...inputProps} disabled={disabled} placeholder={placeholder} />
      </Form.Item>
    </>
  );
};

export default TextInput;

import React from 'react';
import { Form } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import './styles.scss';

const validateMessages = {
  required: `\${label}は${ERROR_MESSAGES.empty}`,
  types: {
    email: ERROR_MESSAGES.invalid,
    url: ERROR_MESSAGES.invalidUrl
  },
  string: {
    // eslint-disable-next-line
    min: '${min}文字以上の半角英数字を入力してください',
    // eslint-disable-next-line
    len: '${len}文字で入力してください'
  }
};

const CustomForm = ({ loading = false, className = '', ...rest }) => {
  return (
    <Form
      className={`custom-form ${className}`}
      layout="vertical"
      validateMessages={validateMessages}
      scrollToFirstError
      {...rest}
    />
  );
};

export default CustomForm;

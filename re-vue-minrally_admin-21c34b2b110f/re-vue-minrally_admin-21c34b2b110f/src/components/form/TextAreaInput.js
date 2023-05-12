import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import './TextInput.scss';

const TextAreaInput = ({
  rows,
  required = false,
  readOnly = false,
  rules = [],
  placeholder = '',
  disabled = false,
  ...rest
}) => {
  return (
    <Form.Item
      {...rest}
      rules={[...[{ required, message: ERROR_MESSAGES.empty }], ...rules]}
      className={`${readOnly && 'text-area-read-only'}`}
    >
      <Input.TextArea
        rows={rows}
        allowClear
        placeholder={placeholder}
        disabled={disabled}
      />
    </Form.Item>
  );
};

TextAreaInput.propTypes = {
  rows: PropTypes.number
};

TextAreaInput.defaultProps = {
  rows: 5
};

export default TextAreaInput;

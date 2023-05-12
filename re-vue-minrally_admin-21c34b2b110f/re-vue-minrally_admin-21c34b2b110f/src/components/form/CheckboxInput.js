import { Divider, Form, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { ERROR_MESSAGES } from '@config/messages';

const CheckboxInput = ({ required, divider, text, ...rest }) => {
  return (
    <>
      <Form.Item
        rules={[{ required, message: ERROR_MESSAGES.empty }]}
        {...rest}
        valuePropName="checked"
      >
        <Checkbox>{text}</Checkbox>
      </Form.Item>
      {divider && <Divider />}
    </>
  );
};

CheckboxInput.propTypes = {
  required: PropTypes.bool,
  divider: PropTypes.bool,
  text: PropTypes.string
};

CheckboxInput.defaultProps = {
  required: false,
  divider: false,
  text: ''
};

export default CheckboxInput;

import { Divider, Form } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { ERROR_MESSAGES } from '@config/messages';
import CustomDatePicker from './CustomDatePicker';
import './DateInput.scss';

const DateInput = ({
  required,
  extraRules,
  divider,
  inputProps,
  noMargin,
  ...rest
}) => {
  return (
    <>
      <Form.Item
        {...rest}
        rules={[{ required, message: ERROR_MESSAGES.empty }, ...extraRules]}
        className={`date-input ${noMargin && 'no-margin'}`}
      >
        <CustomDatePicker {...inputProps} />
      </Form.Item>
      {divider && <Divider />}
    </>
  );
};

DateInput.propTypes = {
  required: PropTypes.bool.isRequired,
  extraRules: PropTypes.array.isRequired,
  divider: PropTypes.bool.isRequired,
  inputProps: PropTypes.object.isRequired
};

DateInput.defaultProps = {
  required: false,
  extraRules: [],
  divider: false,
  inputProps: {}
};

export default DateInput;

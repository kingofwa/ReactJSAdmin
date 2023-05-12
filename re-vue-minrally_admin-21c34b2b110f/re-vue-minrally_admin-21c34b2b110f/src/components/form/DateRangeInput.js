import React from 'react';
import { Form } from 'antd';
import DateRange from './DateRange';

const DateRangeInput = ({ allowClear = true, ...rest }) => {
  return (
    <Form.Item {...rest}>
      <DateRange allowClear={allowClear} />
    </Form.Item>
  );
};

export default DateRangeInput;

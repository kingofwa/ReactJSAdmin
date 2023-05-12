import React from 'react';
import { Form } from 'antd';
import DateRangeSeries from './DateRangeCustom';

const DateRangeInputCustom = ({
  allowClear = false,
  disabledDate,
  ...rest
}) => {
  return (
    <Form.Item {...rest}>
      <DateRangeSeries disabledDate={disabledDate} allowClear={allowClear} />
    </Form.Item>
  );
};

export default DateRangeInputCustom;

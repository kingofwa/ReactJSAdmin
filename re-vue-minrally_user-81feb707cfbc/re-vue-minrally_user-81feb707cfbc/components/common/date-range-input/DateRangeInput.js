import React from "react";
import { Form } from "antd";
import DateRange from "./DateRange";

const DateRangeInput = ({ allowClear = false, disabledDate, ...rest }) => {
  return (
    <Form.Item {...rest}>
      <DateRange allowClear={allowClear} disabledDate={disabledDate} />
    </Form.Item>
  );
};

export default DateRangeInput;

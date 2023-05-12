import React from "react";
import { Form } from "antd";
import { ERROR_MESSAGES } from "@config/messages";
import DateRangeCustom from "./DateRangeCustom";

const DateRangeInputCustom = ({ allowClear = false, required, ...rest }) => {
  return (
    <Form.Item {...rest} rules={[{ required, message: ERROR_MESSAGES.empty }]}>
      <DateRangeCustom allowClear={allowClear} />
    </Form.Item>
  );
};

export default DateRangeInputCustom;

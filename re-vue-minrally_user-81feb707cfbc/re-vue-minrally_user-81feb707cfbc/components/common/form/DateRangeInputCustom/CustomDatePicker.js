import React from "react";
import { DatePicker } from "antd";
import { FORMATTER } from "@config/constants";

const CustomDatePicker = ({ format = FORMATTER.date, ...rest }) => {
  return <DatePicker {...rest} placeholder="" format={format} />;
};

export default CustomDatePicker;

import React from 'react';
import { DatePicker } from 'antd';
import { FORMATTER } from '@config/constants';
import "moment/locale/ja";
import locale from "antd/lib/date-picker/locale/ja_JP";

const CustomDatePicker = ({ format = FORMATTER.date, ...rest }) => {
  return <DatePicker locale={locale} {...rest} format={format} />;
};

export default CustomDatePicker;

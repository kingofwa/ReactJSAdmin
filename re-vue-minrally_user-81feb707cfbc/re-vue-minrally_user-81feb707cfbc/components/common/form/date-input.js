import { Form, DatePicker, ConfigProvider } from "antd";
import { FORMATTER } from "@config/constants";
import jaJP from "antd/es/locale/ja_JP";
import "moment/locale/ja";
import styles from "./date-input.module.scss";

const DateInput = ({
  allowClear = true,
  picker = "date",
  format = FORMATTER.date,
  defaultValue,
  dropdownClassName = "",
  onChange,
  disabledDate,
  ...rest
}) => {
  return (
    <ConfigProvider locale={jaJP}>
      <Form.Item {...rest}>
        <DatePicker
          className={styles.dateInput}
          placeholder="選択してください"
          format={format}
          picker={picker}
          defaultValue={defaultValue}
          allowClear={allowClear}
          dropdownClassName={dropdownClassName}
          onChange={onChange}
          disabledDate={disabledDate}
        />
      </Form.Item>
    </ConfigProvider>
  );
};

export default DateInput;

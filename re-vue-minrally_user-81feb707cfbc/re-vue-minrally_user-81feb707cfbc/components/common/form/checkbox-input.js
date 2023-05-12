import { Checkbox, Form } from "antd";
// import styles from "./checkbox-input.module.scss";

const CheckboxInput = ({ label, name, initialValue = false, ...rest }) => {
  return (
    <Form.Item name={name} valuePropName="checked" initialValue={initialValue}>
      <Checkbox {...rest}>{label}</Checkbox>
    </Form.Item>
  );
};

export default CheckboxInput;

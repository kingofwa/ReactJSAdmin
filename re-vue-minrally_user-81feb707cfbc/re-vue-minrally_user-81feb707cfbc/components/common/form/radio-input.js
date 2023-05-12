import { Form, Radio } from "antd";

const RadioInput = ({ label, name, initialValue = true, options = [] }) => {
  return (
    <Form.Item name={name} label={label} initialValue={initialValue}>
      <Radio.Group options={options} />
    </Form.Item>
  );
};

export default RadioInput;

import { Form, Input } from "antd";

const TextInput = ({ required, inputProps = {}, ...rest }) => {
  return (
    <Form.Item
      initialValue=""
      rules={[{ required }]}
      {...rest}
      className="text-input"
    >
      <Input {...inputProps} />
    </Form.Item>
  );
};

export default TextInput;

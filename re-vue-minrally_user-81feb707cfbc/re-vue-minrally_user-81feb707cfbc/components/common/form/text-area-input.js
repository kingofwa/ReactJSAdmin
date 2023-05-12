import { Form, Input } from "antd";

const TextAreaInput = ({
  required = false,
  maxLength = 1000,
  minRows = 10,
  placeholder,
  ...rest
}) => {
  return (
    <Form.Item
      initialValue=""
      rules={[{ required }]}
      {...rest}
      className="text-area-input"
    >
      <Input.TextArea
        maxLength={maxLength}
        autoSize={{ minRows }}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default TextAreaInput;

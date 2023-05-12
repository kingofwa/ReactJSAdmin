import { Form, Input } from "antd";

const PasswordInput = ({ min, label = "パスワード", name = "password" }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true }, min ? { min } : {}]}
    >
      <Input.Password placeholder={min ? `パスワード（半角英数字${min}文字以上）` : ""} />
    </Form.Item>
  );
};

export default PasswordInput;

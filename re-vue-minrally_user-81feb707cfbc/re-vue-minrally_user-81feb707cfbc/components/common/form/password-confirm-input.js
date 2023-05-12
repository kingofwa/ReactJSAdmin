import { Form, Input } from "antd";

const PasswordConfirmInput = ({
  min,
  label = "",
  name = "password_confirmation",
  nameConfirm = "password"
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        { required: true },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue(nameConfirm) === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("パスワードが一致しません"));
          }
        }),
        min ? { min } : {}
      ]}
    >
      <Input.Password placeholder={min ? `パスワード（確認用）` : ""} />
    </Form.Item>
  );
};

export default PasswordConfirmInput;

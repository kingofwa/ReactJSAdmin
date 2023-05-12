import { Form, Input } from "antd";
import { ERROR_MESSAGES } from "@utils/message-validate";
import { REGEX_MAIL } from "@utils/validate";

const EmailInput = ({
  label = "メールアドレス",
  name = "email",
  required = true,
  placeholder = "",
  ...rest
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue=""
      // rules={[{ required }, { type: "email" }]}
      rules={[
        { required, message: ERROR_MESSAGES.empty },
        {
          max: 254,
          message: ERROR_MESSAGES.maxLength.replace(/:count/, 254)
        },
        {
          pattern: REGEX_MAIL,
          message: ERROR_MESSAGES.invalid
        }
      ]}
      {...rest}
      className="email-input"
      validateFirst
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default EmailInput;

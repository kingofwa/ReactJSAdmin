import { Form, Spin } from "antd";
import { ERROR_MESSAGES } from "@config/messages";

const validateMessages = {
  required: ERROR_MESSAGES.empty,
  types: {
    email: ERROR_MESSAGES.invalidEmail,
    url: ERROR_MESSAGES.invalidUrl
  },
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    min: "${min}文字以上の半角英数字を入力してください"
  }
};

const CustomForm = ({ loading = false, ...rest }) => {
  return (
    <Spin spinning={loading} wrapperClassName="ant-spin-center">
      <Form layout="vertical" validateMessages={validateMessages} {...rest} />
    </Spin>
  );
};

export default CustomForm;

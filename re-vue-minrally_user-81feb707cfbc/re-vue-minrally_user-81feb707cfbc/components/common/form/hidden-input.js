import { Form, Input } from "antd";

const HiddenInput = ({ initialValue = "", ...rest }) => {
  return (
    <Form.Item initialValue={initialValue} hidden {...rest}>
      <Input />
    </Form.Item>
  );
};

export default HiddenInput;

import { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

const SelectInput = ({
  label = "推薦する人との関係",
  placeholder = "選択してください",
  name = "select",
  required,
  data
}) => {
  const [options, setOptions] = useState([]);

  const [isActive, setActive] = useState(true);
  const toggleClass = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    setOptions(data);
  }, []);

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required }]}
      className="select-input"
    >
      <Select
        options={options}
        placeholder={placeholder}
        notFoundContent={null}
        suffixIcon={
          <CaretDownOutlined
            className={isActive ? "ant-select-suffix" : ""}
            onClick={toggleClass}
          />
        }
      />
    </Form.Item>
  );
};

export default SelectInput;

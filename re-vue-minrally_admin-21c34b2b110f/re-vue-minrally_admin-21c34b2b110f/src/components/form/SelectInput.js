import React from 'react';
import { Divider, Form, Select } from 'antd';
import PropTypes from 'prop-types';
import { ERROR_MESSAGES } from '@config/messages';

const { Option } = Select;

const SelectInput = ({
  loading,
  selectOptions,
  required,
  divider,
  selectProps,
  ...rest
}) => {
  const options = selectOptions.map((item, index) => (
    <Option key={index} value={item.value} label={item.label}>
      {item.label}
    </Option>
  ));

  return (
    <>
      <Form.Item
        {...rest}
        rules={[{ required, message: ERROR_MESSAGES.empty }]}
      >
        <Select
          {...selectProps}
          loading={loading}
          placeholder="選択してください"
          notFoundContent={null}
        >
          {options}
        </Select>
      </Form.Item>
      {divider && <Divider />}
    </>
  );
};

SelectInput.propTypes = {
  loading: PropTypes.bool.isRequired,
  selectOptions: PropTypes.array.isRequired,
  required: PropTypes.bool.isRequired,
  divider: PropTypes.bool.isRequired,
  selectProps: PropTypes.object.isRequired
};

SelectInput.defaultProps = {
  loading: false,
  required: false,
  divider: false,
  selectProps: {
    allowClear: true
  }
};

export default SelectInput;

import React from 'react';
import { Divider, Form, Radio } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import './RadioGroupInput.scss';

const RadioGroupInput = ({
  loading = false,
  radioOptions,
  required = false,
  divider = false,
  radioProps,
  extraRow,
  ...rest
}) => {
  const options = radioOptions.map((item, index) => (
    <Radio key={index} value={item.value} disabled={item?.disabled}>
      {item.label}
    </Radio>
  ));

  return (
    <>
      <Form.Item
        {...rest}
        rules={[{ required, message: ERROR_MESSAGES.empty }]}
      >
        <div className="radio-group-input-row">
          <Radio.Group {...radioProps} loading={loading}>
            {options}
          </Radio.Group>
          {extraRow && <div className="extra-row">{extraRow}</div>}
        </div>
      </Form.Item>
      {divider && <Divider />}
    </>
  );
};

export default RadioGroupInput;

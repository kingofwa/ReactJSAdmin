import React from 'react';
import { Form, Divider, Input } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import './MoneyInput.scss';

const MoneyInput = ({
  label = '',
  required = false,
  divider = false,
  extraRules = [],
  inputOpts = {},
  suffix = '円',
  ...rest
}) => {
  return (
    <>
      <div className="money-input">
        <Form.Item
          {...rest}
          label={label}
          rules={[
            { required, message: ERROR_MESSAGES.empty },
            {
              pattern: /^(?:[1-9]\d*|\d)$/,
              message: ERROR_MESSAGES.invalid
            },
            ...extraRules
          ]}
        >
          <Input
            {...inputOpts}
            suffix={<span className="number-input-suffix">{suffix}</span>}
          />
        </Form.Item>
      </div>

      {divider && <Divider />}
    </>
  );
};

export default MoneyInput;

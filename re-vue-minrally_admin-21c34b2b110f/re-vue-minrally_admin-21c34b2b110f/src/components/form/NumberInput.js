import React from 'react';
import { Form, Divider, Input } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import { isEmpty } from 'lodash';
import './NumberInput.scss';

const NumberInput = ({
  label = '',
  required = false,
  divider = false,
  extraRules = [],
  inputOpts = {},
  suffix,
  ...rest
}) => {
  return (
    <>
      <div className="number-input">
        <Form.Item
          rules={[
            { required, message: ERROR_MESSAGES.empty },
            { pattern: /^[1-9][0-9]*$/, message: ERROR_MESSAGES.invalid },
            ...extraRules
          ]}
          {...rest}
          label={label}
          validateFirst={true}
        >
          <Input {...inputOpts} />
        </Form.Item>
        {suffix && (
          <span
            className={
              isEmpty(label)
                ? 'number-input-suffix'
                : 'umber-input-suffix-label'
            }
          >
            {suffix}
          </span>
        )}
      </div>
      {divider && <Divider />}
    </>
  );
};

export default NumberInput;

import React, { useState } from 'react';
import { RadioGroupInput, TextInput, TextAreaInput } from '@components/form';
import { Col, Form, Input, Row } from 'antd';
import './styles.scss';

const rewardItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 }
};

const SerialCode = () => {
  const [number, setNumber] = useState();
  const [issueCode, setIssueCode] = useState();

  const numberOfIssuesOptions = [
    {
      value: '無制限',
      label: '無制限'
    },
    {
      value: '1ユーザーあたり',
      label: '1ユーザーあたり'
    }
  ];

  const onChangeNumber = e => {
    const value = e.target.value;
    setNumber(value);
  };

  const onChangeIssueCode = e => {
    const value = e.target.value;
    setIssueCode(value);
  };

  const issueCodeOptions = [
    {
      value: '自動生成',
      label: '自動生成'
    },
    {
      value: '固定コード',
      label: '固定コード'
    }
  ];

  return (
    <>
      <Row>
        <Col span={4} />
        <Col span={20}>
          <TextInput label="コード名" name="codeName" {...rewardItemLayout} />
          <TextAreaInput
            label="説明文"
            name="explanatoryText"
            {...rewardItemLayout}
          />

          <RadioGroupInput
            label="発行回数"
            name="numberOfIssues"
            radioOptions={numberOfIssuesOptions}
            {...rewardItemLayout}
            onChange={onChangeNumber}
            extra={
              <div className="input-row">
                <Form.Item name="number">
                  <Input disabled={number !== '1ユーザーあたり'} />
                </Form.Item>
                <span>回まで</span>
              </div>
            }
            className="number-input"
          />

          <RadioGroupInput
            label="発行コード"
            name="issueCode"
            radioOptions={issueCodeOptions}
            {...rewardItemLayout}
            onChange={onChangeIssueCode}
            extra={
              <div className="input-row">
                <Form.Item name="fixedCode">
                  <Input disabled={issueCode !== '固定コード'} />
                </Form.Item>
              </div>
            }
            className="number-input"
          />
        </Col>
      </Row>
    </>
  );
};

export default SerialCode;

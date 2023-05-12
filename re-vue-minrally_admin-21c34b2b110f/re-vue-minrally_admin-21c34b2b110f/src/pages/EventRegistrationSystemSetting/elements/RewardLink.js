import React, { useState } from 'react';
import { RadioGroupInput, TextInput, TextAreaInput } from '@components/form';
import { Col, Form, Input, Row } from 'antd';
import './styles.scss';

const rewardItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 }
};

const RewardLink = () => {
  const [number, setNumber] = useState();

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

  return (
    <>
      <Row>
        <Col span={4} />
        <Col span={20}>
          <TextInput label="リンク名" name="linkName" {...rewardItemLayout} />
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

          <TextInput label="URL" name="URL" {...rewardItemLayout} />
        </Col>
      </Row>
    </>
  );
};

export default RewardLink;

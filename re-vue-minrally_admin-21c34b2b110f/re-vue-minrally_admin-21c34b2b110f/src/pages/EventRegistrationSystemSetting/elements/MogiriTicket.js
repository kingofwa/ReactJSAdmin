import React, { useState } from 'react';
import { RadioGroupInput, TextInput, TextAreaInput } from '@components/form';
import { Col, Form, Input, Row } from 'antd';
import './styles.scss';

const rewardItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 }
};

const MogiriTicket = () => {
  const [number, setNumber] = useState();
  const [numberTime, setNumberTime] = useState();

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

  const onChangeNumberTime = e => {
    const value = e.target.value;
    setNumberTime(value);
  };

  const numberOfTimesOptions = [
    {
      value: '無制限',
      label: '無制限'
    },
    {
      value: '1枚あたり',
      label: '1枚あたり'
    }
  ];

  return (
    <>
      <Row>
        <Col span={4} />
        <Col span={20}>
          <TextInput
            label="チケット名"
            name="ticketName"
            {...rewardItemLayout}
          />
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
            label="利用回数"
            name="numberOfTimes"
            radioOptions={numberOfTimesOptions}
            {...rewardItemLayout}
            onChange={onChangeNumberTime}
            extra={
              <div className="input-row">
                <Form.Item name="number">
                  <Input disabled={numberTime !== '1枚あたり'} />
                </Form.Item>
                <span>回</span>
              </div>
            }
            className="number-input"
          />
        </Col>
      </Row>
    </>
  );
};

export default MogiriTicket;

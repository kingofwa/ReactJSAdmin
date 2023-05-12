import React, { useState } from 'react';
import {
  RadioGroupInput,
  TextInput,
  TextAreaInput,
  CheckboxInput
} from '@components/form';
import { Col, Divider, Form, Input, Row } from 'antd';
import { CustomButton } from '@components/buttons';
import './styles.scss';

const rewardItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 }
};

const ApplicationForm = () => {
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

  const answerMethodOptions = [
    {
      value: '自由記入',
      label: '自由記入'
    },
    {
      value: 'チェックボックス',
      label: 'チェックボックス'
    },
    {
      value: 'ラジオボタン',
      label: 'ラジオボタン'
    }
  ];

  return (
    <>
      <Row>
        <Col span={4} />
        <Col span={20}>
          <TextInput label="フォーム名" name="formName" {...rewardItemLayout} />
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

          <Col span={13}>
            <Divider />
          </Col>
          <TextInput label="質問1" name="question1" {...rewardItemLayout} />
          <RadioGroupInput
            label="回答方法"
            name="answerMethod"
            radioOptions={answerMethodOptions}
            {...rewardItemLayout}
          />

          <CheckboxInput
            label="必須"
            text="回答を必須にする"
            {...rewardItemLayout}
          />
          <Col span={13}>
            <Divider />
          </Col>
          <Form.Item>
            <CustomButton>質問を追加</CustomButton>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ApplicationForm;

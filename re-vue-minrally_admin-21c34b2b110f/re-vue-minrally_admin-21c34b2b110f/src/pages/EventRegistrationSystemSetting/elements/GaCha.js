import React, { useState } from 'react';
import { RadioGroupInput, TextInput, TextAreaInput } from '@components/form';
import { Col, Divider, Form, Input, Row } from 'antd';
import UploadPhotos from '@components/UploadPhotos';
import { CustomButton } from '@components/buttons';
import './styles.scss';

const rewardItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 }
};

const occurrenceRateLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 2 }
};

const Gacha = ({ form }) => {
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

  const provideMethodOptions = [
    {
      value: '郵送',
      label: '郵送'
    },
    {
      value: 'メール',
      label: 'メール'
    },
    {
      value: 'その場でダウンロード',
      label: 'その場でダウンロード'
    }
  ];

  return (
    <>
      <Row>
        <Col span={4} />
        <Col span={20}>
          <TextInput label="ガチャ名" name="gachaName" {...rewardItemLayout} />
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
          <TextInput label="景品1" name="Freebie1" {...rewardItemLayout} />
          <TextAreaInput
            label="説明文"
            name="gachaDescription"
            {...rewardItemLayout}
          />
          <TextInput
            name="occurrenceRate"
            label="出現率"
            {...occurrenceRateLayout}
          />
          <UploadPhotos
            form={form}
            label="画像"
            name="photos"
            {...rewardItemLayout}
          />
          <RadioGroupInput
            label="提供方法"
            name="provideMethod"
            radioOptions={provideMethodOptions}
            {...rewardItemLayout}
          />
          <UploadPhotos
            form={form}
            label="提供データ"
            {...rewardItemLayout}
            name="files"
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

export default Gacha;

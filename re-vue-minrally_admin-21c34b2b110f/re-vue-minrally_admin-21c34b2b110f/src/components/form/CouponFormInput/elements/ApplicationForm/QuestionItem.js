import React, { useState } from 'react';
import { Form, Radio } from 'antd';
import AnswerCheckBox from './AnswerCheckBox';
import { QUESTION_TYPE } from '@config/constants';
import AnswerTextBox from './AnswerTextBox';
import './styles.scss';

const QuestionItem = ({ fieldName, form }) => {
  const [type, setType] = useState(QUESTION_TYPE.TEXT_BOX);

  const onChangeAnswer = e => {
    setType(e?.target?.value);
  };

  const renderAnswerType = () => {
    if (type === QUESTION_TYPE.TEXT_BOX) {
      return <AnswerTextBox fieldName={[fieldName, 'limit_text']} />;
    } else if (type === QUESTION_TYPE.CHECK_BOX) {
      return (
        <AnswerCheckBox
          fieldName={[fieldName, 'reward_image_template_attributes']}
          type={QUESTION_TYPE.CHECK_BOX}
          form={form}
          key={type}
        />
      );
    } else if (type === QUESTION_TYPE.RADIO_BUTTON) {
      return (
        <AnswerCheckBox
          fieldName={[fieldName, 'reward_image_template_attributes']}
          type={QUESTION_TYPE.RADIO_BUTTON}
          form={form}
          key={type}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Form.Item
        label="回答方法"
        name={[fieldName, 'type']}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        required
      >
        <Radio.Group
          defaultValue={QUESTION_TYPE.TEXT_BOX}
          onChange={onChangeAnswer}
        >
          <Radio value={QUESTION_TYPE.TEXT_BOX}>自由記入</Radio>
          <Radio value={QUESTION_TYPE.CHECK_BOX}>チェックボックス</Radio>
          <Radio value={QUESTION_TYPE.RADIO_BUTTON}>ラジオボタン</Radio>
        </Radio.Group>
      </Form.Item>
      {renderAnswerType()}
    </>
  );
};

export default QuestionItem;

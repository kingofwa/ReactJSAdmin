import React from 'react';
import { Form, Row, Col, Divider } from 'antd';
import { TextInput, CheckboxInput } from '@components/form';
import { MinusCircleOutlined } from '@ant-design/icons';
import CustomButton from '@components/buttons/custom-button';
import { size } from 'lodash';
import QuestionItem from './QuestionItem';
import './styles.scss';

const Questions = ({ form }) => {
  const defaultItem = {
    name: 0,
    key: 0,
    isListField: true,
    fieldKey: 0
  };

  const renderRequired = field => {
    return (
      <CheckboxInput
        label="必須"
        text="回答を必須にする"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        name={[field, 'required']}
      />
    );
  };

  return (
    <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      <Form.List name="question_attributes">
        {(questions, { add, remove }) => {
          if (size(questions) === 0) {
            questions.push(defaultItem);
          }
          return (
            <div>
              {questions.map((field, idx) => {
                return (
                  <div key={field.key}>
                    <Row justify="space-between">
                      <Col span={23}>
                        <TextInput
                          name={[idx, 'title']}
                          label={`質問${idx + 1}`}
                          labelCol={{ span: 5 }}
                          wrapperCol={{ span: 19 }}
                          required
                        />
                      </Col>
                      <Col span={1} style={{ textAlign: 'right' }}>
                        {questions.length > 1 ? (
                          <MinusCircleOutlined
                            style={{ fontSize: '16px' }}
                            className="icon-delete"
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </Col>
                    </Row>
                    <QuestionItem fieldName={idx} form={form} />
                    {renderRequired(idx)}
                    <Divider />
                  </div>
                );
              })}
              <CustomButton
                type="primary"
                className="btn-outLine"
                onClick={() => add()}
              >
                ＋質問を追加する
              </CustomButton>
              <Divider />
              <div className="question-note">
                <b>注意事項</b> <br />
                応募フォームには、注意事項が記載されます。
                <br />
                 ※個人情報は賞品発送がある場合のみ入力のご依頼いたします。
                <br />
                 ※ラリーマスターが報酬発送を実施いたします。
              </div>
            </div>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};

export default Questions;

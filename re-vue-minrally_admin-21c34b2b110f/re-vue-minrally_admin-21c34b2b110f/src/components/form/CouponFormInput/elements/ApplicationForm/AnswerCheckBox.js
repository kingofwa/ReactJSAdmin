import React from 'react';
import { Row, Col, Divider, Form } from 'antd';
import { TextInput } from '@components/form';
import { MinusCircleOutlined } from '@ant-design/icons';
import CustomButton from '@components/buttons/custom-button';
import { size } from 'lodash';
import AnswerImageUpload from './AnswerImageUpload';
import './styles.scss';

const AnswerCheckBox = ({ fieldName, type = 'check_box', form }) => {
  const defaultItem = {
    name: 0,
    key: 0,
    isListField: true,
    fieldKey: 0
  };

  return (
    <Row>
      <Col span={6} />
      <Col span={18}>
        <Form.List name={fieldName}>
          {(answer, { add, remove }) => {
            if (size(answer) === 0) {
              answer.push(defaultItem);
            }
            return (
              <div>
                {answer.map((field, idx) => {
                  return (
                    <div key={`${field.key}-${type}`}>
                      <Row justify="space-between">
                        <Col span={23}>
                          <TextInput
                            name={[field.name, 'title']}
                            label={idx + 1}
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 22 }}
                            required
                          />
                        </Col>
                        <Col span={1} style={{ textAlign: 'right' }}>
                          {answer.length > 1 ? (
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
                      <AnswerImageUpload
                        name={[field.name, 'photos']}
                        max={1}
                        isCropped
                      />
                      <Divider />
                    </div>
                  );
                })}
                <Form.Item>
                  <CustomButton
                    type="primary"
                    className="btn-outLine"
                    onClick={() => add()}
                  >
                    ＋オプションを追加する
                  </CustomButton>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Col>
    </Row>
  );
};

export default AnswerCheckBox;

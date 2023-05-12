import React from 'react';
import { Col, Form, Row } from 'antd';
import { TextInput } from '@components/form';
import { MinusCircleOutlined } from '@ant-design/icons';
import { REGEX_URL } from '@utils/validate';
import { ERROR_MESSAGES } from '@config/messages';
import { size } from 'lodash';
import CustomButton from '@components/buttons/custom-button';
import './styles.scss';

const RelatedLinks = ({ label = '各種リンク', extra }) => {
  const defaultItem = {
    name: 0,
    key: 0,
    isListField: true,
    fieldKey: 0
  };

  return (
    <>
      <Form.Item label={label} labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
        <Form.List name="related_links_attributes">
          {(fields, { add, remove }) => {
            if (size(fields) === 0) {
              fields.push(defaultItem);
            }
            return (
              <div>
                {fields.map(field => {
                  return (
                    <div key={field.key}>
                      <Row justify="space-between">
                        <Col span={11}>
                          <TextInput
                            inputProps={{ placeholder: 'リンクのタイトル' }}
                            name={[field.name, 'name']}
                            rules={[
                              {
                                max: 24,
                                message: ERROR_MESSAGES.maxLength.replace(
                                  /:count/,
                                  24
                                )
                              }
                            ]}
                            placeholder="リンクのタイトル"
                          />
                        </Col>
                        <Col span={11}>
                          <TextInput
                            name={[field.name, 'url']}
                            // required
                            placeholder="URL"
                            rules={[
                              {
                                pattern: REGEX_URL,
                                message: ERROR_MESSAGES.invalid
                              }
                            ]}
                          />
                        </Col>
                        <Col span={1}>
                          <MinusCircleOutlined
                            className={field.key === 0 ? 'd-none' : ''}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  );
                })}
                {extra && <p>{extra}</p>}
                <CustomButton
                  type="primary"
                  className="btn-outLine"
                  onClick={() => add()}
                >
                  リンクを追加する
                </CustomButton>
              </div>
            );
          }}
        </Form.List>
      </Form.Item>
    </>
  );
};

export default RelatedLinks;

import React from 'react';
import { Col, Form, Row } from 'antd';
import { TextInput } from '@components/form';
import { MinusCircleOutlined } from '@ant-design/icons';
import { ERROR_MESSAGES } from '@config/messages';
import { size } from 'lodash';
import CustomButton from '@components/buttons/custom-button';
import { REGEX_URL_YOUTUBE } from '@utils/validate';
import './styles.scss';

const YoutubeLinks = () => {
  const defaultItem = {
    name: 0,
    key: 0,
    isListField: true,
    fieldKey: 0
  };

  return (
    <>
      <Form.Item
        label="YouTube動画"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.List name="youtube_video_list">
          {(youtubeLinks, { add, remove }) => {
            if (size(youtubeLinks) === 0) {
              youtubeLinks.push(defaultItem);
            }
            return (
              <div>
                {youtubeLinks.map(field => {
                  return (
                    <div key={field.key}>
                      <Row justify="space-between">
                        <Col span={22}>
                          <TextInput
                            name={field.name}
                            placeholder="URL"
                            rules={[
                              {
                                pattern: REGEX_URL_YOUTUBE,
                                message: ERROR_MESSAGES.invalid
                              }
                              // {
                              //   required: true,
                              //   message: 'URLは必須です'
                              // }
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
                <p>
                  YouTubeの動画URLを入力すると、ラリーページに動画が埋め込まれます。
                </p>
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

export default YoutubeLinks;

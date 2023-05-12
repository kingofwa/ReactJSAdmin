import React from 'react';
import { Row, Col, Form, Radio } from 'antd';
import { TEXT_BOX_TYPE } from '@config/constants';
import './styles.scss';

const AnswerTextBox = ({ fieldName }) => {
  return (
    <Row>
      <Col span={6} />
      <Col span={18}>
        <Form.Item
          name={fieldName}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          required
        >
          <Radio.Group defaultValue={TEXT_BOX_TYPE.TEXT_INPUT}>
            <Radio value={TEXT_BOX_TYPE.TEXT_INPUT}>短い答え</Radio>
            <Radio value={TEXT_BOX_TYPE.AREA_INPUT}>段落</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AnswerTextBox;

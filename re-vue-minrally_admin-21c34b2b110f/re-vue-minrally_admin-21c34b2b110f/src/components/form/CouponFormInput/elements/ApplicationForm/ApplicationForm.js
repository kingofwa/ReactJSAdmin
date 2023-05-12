import React from 'react';
import { TextAreaInput, NumberInput } from '@components/form';
import { Form, Row, Col, Radio, Divider } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import DateInput from '../../../DateInput';
import Questions from './Questions';
import './styles.scss';

const ApplicationForm = ({ form }) => {
  return (
    <div className="application-form">
      <Row gutter={[8, 32]}>
        <Col span={4} />
        <Col span={20} className="form-coupon">
          <p className="application-form__note">
            ※プレゼントする追加報酬の設定、および、報酬の発送先、アンケートなどをユーザーに向けて入力できるフォームを作成できます。
          </p>
          <DateInput
            name="form_expiry_date"
            label="報酬の申込期限"
            required
            inputProps={{
              placeholder: 'YYYY/MM/DD'
            }}
          />
          <TextAreaInput
            label="説明文"
            name="form_description"
            placeholder="〇〇で使える10%引きクーポン"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            rules={[
              {
                max: 100,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 100)
              }
            ]}
            required
          />
          <Form.Item
            name="issuesPerUser"
            className="form-item"
            label="発行回数"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            required
          >
            <Radio.Group
              defaultValue={0}
              className="issue-group"
              // onChange={handleChangePerUser}
            >
              <Radio value={0}>無制限</Radio>
              <Radio value={1} className="radio-with-textbox">
                1ユーザーあたり
                <Form.Item
                  className="extra"
                  labelCol={{ span: 14 }}
                  wrapperCol={{ span: 10 }}
                >
                  <NumberInput
                    suffix="回まで"
                    name="issue_per_user"
                    // required={isRequirePerUser}
                    // onChange={handlePerUser}
                  />
                </Form.Item>
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Divider />
          <Questions form={form} />
        </Col>
      </Row>
    </div>
  );
};

export default ApplicationForm;

import React, { useState } from 'react';
import {
  CustomForm,
  TextInput,
  SelectInput,
  TextAreaInput
} from '@components/form';
import { SubmitButton } from '@components/buttons';
import { Form, Radio } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import RelatedLinks from '@components/Event/RelatedLinks';
import CustomUploadPhoto from '@components/CustomUploadPhoto';
import ConfirmChangeEmailModal from '@components/Modals/ConfirmChangeEmailModal';
import { map } from 'lodash';
import './styles.scss';

const formName = 'business-info';

const BusinessInfoForm = ({
  form,
  onSubmit,
  isSubmit,
  isEdit,
  businessAvatar
}) => {
  const [isDisabledEmail, setDisabledEmail] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };

  const year = Array.from({ length: 73 }, (_, i) => i + 1950);

  const birthDayOptions = map(year, item => {
    return { value: item, label: item };
  });

  return (
    <div className="business-info">
      <div className="business-info-title">事業者情報</div>
      <div className="business-info-body">
        <CustomForm
          {...formItemLayout}
          name={formName}
          autoComplete="off"
          className="business-info-form"
          onFinish={onSubmit}
          form={form}
        >
          <TextInput
            name="business_name"
            label="事業者名"
            inputProps={{ placeholder: '企業・団体名を入力' }}
            rules={[
              {
                required: true,
                message: ERROR_MESSAGES.empty
              },
              {
                max: 15,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 15)
              }
            ]}
          />
          <TextInput
            name="department_name"
            label="部署名"
            inputProps={{ placeholder: '〇〇部' }}
            required
          />
          <TextInput name="person_in_charge_name" label="担当者名" required />
          <TextInput
            name="email"
            label="メールアドレス"
            rules={[
              { required: true, message: ERROR_MESSAGES.empty },
              { type: 'email' },
              {
                max: 254,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 254)
              }
            ]}
            disabled={isDisabledEmail}
            extra={
              <span
                className="changing-email"
                onClick={() => setShowModal(true)}
              >
                メールアドレス変更
              </span>
            }
          />

          <SelectInput
            label="生年月日"
            name="year_of_birth"
            selectOptions={birthDayOptions}
            required
          />

          <Form.Item
            name="sex"
            label="性別"
            rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
          >
            <Radio.Group>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
              <Radio value="other">その他</Radio>
            </Radio.Group>
          </Form.Item>

          <TextInput
            name="profession"
            label="職業"
            required
            rules={[
              {
                max: 30,
                message: ERROR_MESSAGES.maxLength.replace(/:count/, 30)
              }
            ]}
          />

          <CustomUploadPhoto
            form={form}
            label="プロフィール画像"
            name="photos"
            showNote
            photos={businessAvatar}
            max={1}
            required
          />

          <TextAreaInput
            label="プロフィール"
            name="information"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            required
          />

          <RelatedLinks />
          <div className="business-info-actions">
            <SubmitButton text={isEdit ? '更新' : '登録'} loading={isSubmit} />
          </div>
        </CustomForm>
      </div>
      <ConfirmChangeEmailModal
        show={showModal}
        onHideModal={() => setShowModal(false)}
        onSuccess={() => setDisabledEmail(false)}
      />
    </div>
  );
};

export default BusinessInfoForm;

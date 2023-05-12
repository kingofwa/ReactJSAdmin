import React, { useEffect, useState } from 'react';
import {
  CustomForm,
  TextInput,
  TextAreaInput,
  RadioGroupInput
} from '@components/form';
import { SubmitButton, CustomButton } from '@components/buttons';
import UploadPhotos from '@components/UploadPhotos';
import { Form } from 'antd';
import DateRangeInputCustom from '@components/form/DateRangeInputCustom';
import YoutubeLinks from '@components/Event/YoutubeLinks';
import RelatedLinks from '@components/Event/RelatedLinks';
import HashTagsInput from '@components/form/HashTagsInput';
import { ERROR_MESSAGES } from '@config/messages';
import MoneyInput from '@components/form/MoneyInput';
import { PeriodSetingEnum } from '@config/constants';
import moment from 'moment-timezone';

import './styles.scss';

const RegisterRallyForm = ({ onSubmit = () => {}, setIsDraft = () => {} }) => {
  const [form] = Form.useForm();
  const [rallySetting, setRallySetting] = useState(PeriodSetingEnum.UNLIMITED);
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };

  useEffect(() => {
    form.setFieldsValue({
      rallyPeriodSetting: PeriodSetingEnum.UNLIMITED
    });
    // eslint-disable-next-line
  }, []);

  const rallySettingOptions = [
    {
      label: '無制限',
      value: PeriodSetingEnum.UNLIMITED
    },
    {
      label: '期限あり',
      value: PeriodSetingEnum.LIMITED
    }
  ];

  const onFinish = values => {
    onSubmit(values);
  };

  const onChangeRallySetting = e => {
    if (
      e?.target?.value === PeriodSetingEnum.LIMITED ||
      e?.target?.value === PeriodSetingEnum.UNLIMITED
    ) {
      setRallySetting(e?.target?.value);
    }
  };

  const renderSelectDateRange = () => {
    if (rallySetting === PeriodSetingEnum.LIMITED) {
      return (
        <DateRangeInputCustom
          name="period"
          disabledDate={moment()}
          allowClear
          required
          rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className="event-registration-info">
        <div className="event-registration-info-title">ラリー情報</div>
        <div className="event-registration-info-body">
          <CustomForm
            {...formItemLayout}
            name="event-info"
            autoComplete="off"
            className="event-info-form"
            onFinish={onFinish}
            form={form}
          >
            <TextInput
              name="name"
              label="ラリー名"
              placeholder="最大40文字"
              required
              rules={[
                {
                  max: 40,
                  message: ERROR_MESSAGES.maxLength.replace(/:count/, 40)
                }
              ]}
            />
            <UploadPhotos form={form} label="トップ画像" name="top_photo" />

            <TextAreaInput
              label="ラリー説明"
              name="description"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              required
              rules={[
                {
                  max: 500,
                  message: ERROR_MESSAGES.maxLength.replace(/:count/, 500)
                }
              ]}
            />

            <HashTagsInput form={form} />

            <RadioGroupInput
              className="rally-period-setting"
              label="ラリー期間設定"
              name="rallyPeriodSetting"
              radioOptions={rallySettingOptions}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onChange={onChangeRallySetting}
              radioProps={{ value: rallySetting }}
              extraRow={renderSelectDateRange()}
              required
            />

            <TextAreaInput
              label="注意事項"
              name="notes"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              rules={[
                {
                  max: 500,
                  message: ERROR_MESSAGES.maxLength.replace(/:count/, 500)
                }
              ]}
            />

            <YoutubeLinks />

            <RelatedLinks
              extra="このラリーに関連したリンクを設定することができます。"
              label="関連リンク"
            />

            <MoneyInput
              label="参加者の想定費用"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 4 }}
              suffix="円"
              name="fee"
            />

            <div className="event-registration-info-actions">
              <CustomButton
                htmlType="submit"
                className="btn-action"
                onClick={() => setIsDraft(true)}
              >
                下書き保存
              </CustomButton>
              <SubmitButton
                className="btn-action"
                text="スポット登録へ"
                onClick={() => setIsDraft(false)}
              />
            </div>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default RegisterRallyForm;

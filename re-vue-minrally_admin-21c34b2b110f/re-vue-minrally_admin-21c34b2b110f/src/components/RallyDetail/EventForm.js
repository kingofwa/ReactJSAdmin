import React, { useEffect, useState } from 'react';
import {
  CustomForm,
  TextInput,
  RadioGroupInput,
  TextAreaInput,
  SelectInput
} from '@components/form';
import { SubmitButton, CustomButton } from '@components/buttons';
import DateRangeInputCustom from '@components/form/DateRangeInputCustom';
import YoutubeLinks from '@components/Event/YoutubeLinks';
import RelatedLinks from '@components/Event/RelatedLinks';
import HashTagsInput from '@components/form/HashTagsInput';
import UploadTopPhoto from '@components/UploadTopPhoto';
import CertificateModal from '@components/Modals/CertificateModal';
import { EVENT_STATUS } from '@config/constants';
import { ERROR_MESSAGES } from '@config/messages';
import MoneyInput from '@components/form/MoneyInput';
import CouponFormInput from '@components/form/CouponFormInput';
import { PeriodSetingEnum } from '@config/constants';
import moment from 'moment-timezone';

import './styles.scss';

const EventForm = ({
  form,
  onSubmit,
  eventData,
  certificate,
  setCertificate,
  topPhoto,
  googlePhoto,
  isSubmit,
  seriesOptions,
  setIsDraft = () => {},
  isDisableSubmit,
  isBusiness
}) => {
  const [rallySetting, setRallySetting] = useState(PeriodSetingEnum.UNLIMITED);
  const [certificateSetting, setCertificateSetting] = useState('yes');
  const [showModal, setShowModal] = useState(false);
  const isPublished = eventData?.status === EVENT_STATUS.PUBLISHED;
  const [couponInfo, setCouponInfo] = useState();

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };

  useEffect(() => {
    if (eventData?.end_date && eventData?.start_date) {
      setRallySetting(PeriodSetingEnum.LIMITED);
    } else {
      setRallySetting(PeriodSetingEnum.UNLIMITED);
    }
    if (eventData?.coupon_reward_template?.id) {
      setCouponInfo(eventData.coupon_reward_template);
    }
  }, [eventData]);

  useEffect(() => {
    setCertificateSetting('yes');
  }, [eventData]);

  const eventCompletionRewardOptions = [
    // {
    //   label: 'なし',
    //   value: 'no'
    // },
    {
      label: '賞状画像（デフォルト）',
      value: 'yes'
    }
  ];

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

  const onChangeRallySetting = e => {
    if (
      e?.target?.value === PeriodSetingEnum.LIMITED ||
      e?.target?.value === PeriodSetingEnum.UNLIMITED
    ) {
      setRallySetting(e?.target?.value);
    }
  };

  const onChangeCertificateSetting = e => {
    if (e?.target?.value === 'yes' || e?.target?.value === 'no') {
      setCertificateSetting(e?.target?.value);
    }
  };

  const rallyName = form.getFieldsValue()?.name;

  const disabledSelectSerie =
    !!eventData?.serie_id && eventData?.status === EVENT_STATUS.PUBLISHED;

  const renderSelectDateRange = () => {
    if (rallySetting === PeriodSetingEnum.LIMITED) {
      return (
        <DateRangeInputCustom
          disabledDate={moment(eventData?.created_at).tz('Asia/Tokyo')}
          name="period"
          allowClear
          required
          rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
        />
      );
    }
    return null;
  };

  const renderPhoto = () => {
    return (
      <UploadTopPhoto
        form={form}
        label="トップ画像"
        topPhoto={topPhoto}
        googlePhoto={googlePhoto}
        name="photos"
      />
    );
  };

  return (
    <>
      <div className="event-detail">
        <div className="event-detail-title">ラリー情報</div>
        <div className="event-detail-body">
          <CustomForm
            {...formItemLayout}
            name="event-detail"
            autoComplete="off"
            className="event-info-form"
            onFinish={onSubmit}
            form={form}
          >
            <TextInput
              name="name"
              label="ラリー名"
              required
              placeholder="最大40文字"
              rules={[
                {
                  max: 40,
                  message: ERROR_MESSAGES.maxLength.replace(/:count/, 40)
                }
              ]}
            />

            {renderPhoto()}

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

            <HashTagsInput form={form} name="tag_list" />

            <RadioGroupInput
              label="制覇報酬"
              radioOptions={eventCompletionRewardOptions}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              extraRow={
                <CustomButton onClick={() => setShowModal(true)}>
                  賞状を編集
                </CustomButton>
              }
              radioProps={{ value: certificateSetting }}
              onChange={onChangeCertificateSetting}
              name="certificateSetting"
            />
            <CouponFormInput
              form={form}
              couponInfo={couponInfo}
              isEdit={true}
              isBusiness={isBusiness}
            />

            <RadioGroupInput
              className="rally-period-setting"
              label="ラリー期間設定"
              name="periodSetting"
              radioOptions={rallySettingOptions}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onChange={onChangeRallySetting}
              radioProps={{ value: rallySetting }}
              extraRow={renderSelectDateRange()}
              value={rallySetting}
              required
            />

            <TextAreaInput
              label="注意事項"
              name="note"
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

            <RelatedLinks label="関連リンク" />

            <MoneyInput
              label="参加者の想定費用"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 4 }}
              suffix="円"
              name="fee"
            />

            <SelectInput
              className="series-setting"
              label="登録グランドラリー名"
              name="serie_id"
              selectOptions={seriesOptions}
              selectProps={{ disabled: disabledSelectSerie }}
            />

            <TextInput
              name="registration_date"
              label="登録日"
              disabled
              readOnly
            />

            <TextInput name="status" label="ステータス" disabled readOnly />

            {eventData?.number_of_players === 0 && (
              <div className="event-detail-note">
                スポットは最低3箇所の登録が必要です。下書き状態のスポットがあると公開できません。
              </div>
            )}

            <div className="event-detail-actions">
              {isPublished ? (
                <SubmitButton
                  text="更新して公開"
                  loading={isSubmit}
                  disabled={isSubmit}
                  onClick={() => setIsDraft(false)}
                />
              ) : (
                <>
                  <SubmitButton
                    text="下書き保存"
                    loading={isSubmit}
                    disabled={isSubmit}
                    onClick={() => setIsDraft(true)}
                  />
                  <SubmitButton
                    text="更新して公開"
                    loading={isSubmit}
                    disabled={isSubmit || isDisableSubmit}
                    onClick={() => setIsDraft(false)}
                  />
                </>
              )}
            </div>
          </CustomForm>

          <CertificateModal
            visible={showModal}
            certificate={certificate}
            setCertificate={setCertificate}
            onVisible={() => {
              setShowModal(false);
            }}
            name={rallyName}
            creator={eventData?.owner_info?.business_name}
          />
        </div>
      </div>
    </>
  );
};

export default EventForm;

import React, { useEffect, useState } from 'react';
import {
  CustomForm,
  TextInput,
  RadioGroupInput,
  TextAreaInput
} from '@components/form';
import { SubmitButton, CustomButton } from '@components/buttons';
import RallySelectModal from '@components/Modals/RallySelectModal';
import { Form } from 'antd';
import { map, size } from 'lodash';
import CertificateModal from '@components/Modals/CertificateModal';
import UploadTopPhoto from '@components/UploadTopPhoto';
import HashTagsInput from '@components/form/HashTagsInput/HashTagsInput';
import { ERROR_MESSAGES } from '@config/messages';
import { REGEX_SPECIAL_CHARS } from '@utils/validate';
import MoneyInput from '@components/form/MoneyInput';
import CouponFormInput from '@components/form/CouponFormInput';
import DateRangeInputCustom from '@components/form/DateRangeInputCustom';
import { PeriodSetingEnum } from '@config/constants';
import moment from 'moment-timezone';

import './styles.scss';

const SeriesInfoForm = ({
  form,
  onSubmit,
  isEdit = false,
  businessId,
  tagList = [],
  certificate,
  setCertificate,
  topPhoto,
  googlePhoto,
  isSubmit,
  seriesData,
  businessName,
  isCreate,
  couponInfo,
  isBusiness
}) => {
  const [showModalRally, setShowModalRally] = useState(false);
  const [showModalCertificate, setShowModalCertificate] = useState(false);
  const [rallyList, setRallyList] = useState([]);
  const [certificateSelect, setCertificateSelect] = useState();
  const [periodSetting, setPeriodSetting] = useState(
    PeriodSetingEnum.UNLIMITED
  );
  const data = form.getFieldsValue();
  useEffect(() => {
    setCertificateSelect('yes');
    if (seriesData) {
      setPeriodSetting(seriesData?.periodSetting);
      form.setFieldsValue({
        grandPeriodSetting: seriesData?.periodSetting
      });
    } else if (!isEdit) {
      form.setFieldsValue({
        grandPeriodSetting: PeriodSetingEnum.UNLIMITED
      });
    }

    // eslint-disable-next-line
  }, [seriesData, isEdit]);

  const onChangeCertificate = e => {
    setCertificateSelect(e?.target?.value);
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, seriesCompletionReward: e?.target?.value });
  };

  const onChangeRallyList = games => {
    setRallyList(games);
    const games_ids = map(games, game => game?.id);
    const currentData = form.getFieldsValue();
    form.setFieldsValue({ ...currentData, games_ids });
  };

  const onChangePeriodSetting = e => {
    if (
      e?.target?.value === PeriodSetingEnum.LIMITED ||
      e?.target?.value === PeriodSetingEnum.UNLIMITED
    ) {
      setPeriodSetting(e?.target?.value);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      ...data,
      tags: tagList,
      seriesCompletionReward: 'yes'
    });
    // eslint-disable-next-line
  }, [tagList]);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };

  const seriesCompletionRewardOptions = [
    {
      label: '賞状画像（デフォルト）',
      value: 'yes'
    }
  ];

  const seriesName = form.getFieldsValue()?.name;

  const renderRegistrationDate = () => {
    return (
      <TextInput name="registration_date" label="登録日" disabled readOnly />
    );
  };

  const gandSettingOptions = [
    {
      label: '無制限',
      value: PeriodSetingEnum.UNLIMITED
    },
    {
      label: '期限あり',
      value: PeriodSetingEnum.LIMITED
    }
  ];

  const renderSelectDateRange = () => {
    if (periodSetting === PeriodSetingEnum.LIMITED) {
      return (
        <DateRangeInputCustom
          name="period"
          disabledDate={
            isEdit ? moment(seriesData?.created_at).tz('Asia/Tokyo') : moment()
          }
          allowClear
          required
          rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
        />
      );
    }
    return null;
  };

  const renderSelectRally = () => {
    return (
      <>
        <Form.Item
          label="ラリー選択"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <div className="rally-row">
            <CustomButton
              type="primary"
              className="btn-action"
              onClick={() => {
                setShowModalRally(true);
              }}
            >
              ラリー選択
            </CustomButton>
            <span className="rally-note">
              一度グランドラリーを設定すると解除することはできません。
            </span>
          </div>

          {size(rallyList) > 0 && (
            <>
              <p className="rally-title">選択中のラリー</p>
              <div className="rally-list">
                {rallyList.map((item, index) => {
                  return (
                    <span className="rally-item" key={`rally-${index}`}>
                      {item?.name}
                    </span>
                  );
                })}
              </div>
            </>
          )}
          <RallySelectModal
            isBusiness={isBusiness}
            visible={showModalRally}
            onVisible={() => {
              setShowModalRally(false);
            }}
            businessId={businessId}
            onChangeRallyList={onChangeRallyList}
          />
        </Form.Item>
      </>
    );
  };

  const renderPhoto = () => {
    return (
      <UploadTopPhoto
        form={form}
        label="トップ画像"
        topPhoto={topPhoto}
        googlePhoto={googlePhoto}
        name="photos"
        isCreate={isCreate}
      />
    );
  };

  return (
    <>
      <div className="series-info">
        <div className="series-info-title">グランドラリー情報</div>
        <div className="series-info-body">
          <CustomForm
            {...formItemLayout}
            name="series-info"
            autoComplete="off"
            className="series-info-form"
            onFinish={onSubmit}
            form={form}
          >
            <TextInput
              name="name"
              label="グランドラリー名"
              placeholder="東急電鉄ラリー"
              required
              rules={[
                {
                  max: 40,
                  message: ERROR_MESSAGES.maxLength.replace(/:count/, 40)
                },
                {
                  min: 2,
                  message: ERROR_MESSAGES.minLength.replace(/:count/, 2)
                },
                {
                  pattern: REGEX_SPECIAL_CHARS,
                  message: ERROR_MESSAGES.invalid
                }
              ]}
            />
            {renderPhoto()}
            <TextAreaInput
              label="グランドラリー説明"
              placeholder="東急電鉄の各駅をめぐるラリー。駅に設置されているQRコードを読み取り、すべての駅にチェックインしよう！"
              name="description"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              rules={[
                {
                  max: 500,
                  message: ERROR_MESSAGES.maxLength.replace(/:count/, 500)
                }
              ]}
              required
            />
            <HashTagsInput form={form} name="tag_list" required />
            <RadioGroupInput
              required
              className="rally-period-setting"
              label="ラリー期間設定"
              name="grandPeriodSetting"
              radioOptions={gandSettingOptions}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onChange={onChangePeriodSetting}
              radioProps={{ value: periodSetting }}
              extraRow={renderSelectDateRange()}
            />
            <RadioGroupInput
              label="制覇報酬"
              name="seriesCompletionReward"
              radioOptions={seriesCompletionRewardOptions}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onChange={onChangeCertificate}
              radioProps={{ value: certificateSelect }}
              extraRow={
                <CustomButton
                  onClick={() => {
                    setShowModalCertificate(true);
                  }}
                >
                  賞状を編集
                </CustomButton>
              }
            />
            <CouponFormInput
              form={form}
              couponInfo={couponInfo}
              isEdit={isEdit}
              isBusiness={isBusiness}
            />

            {!isEdit && renderSelectRally()}
            <MoneyInput
              label="参加費"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 4 }}
              name="fee"
            />
            {isEdit && renderRegistrationDate()}
            {showModalCertificate && (
              <CertificateModal
                visible={showModalCertificate}
                certificate={certificate}
                setCertificate={setCertificate}
                onVisible={() => {
                  setShowModalCertificate(false);
                }}
                name={seriesName || seriesData?.name || 'グランドラリー名'}
                creator={businessName}
              />
            )}

            <div className="series-info-actions">
              <SubmitButton
                text={isEdit ? '更新' : '登録'}
                loading={isSubmit}
                disabled={isSubmit}
              />
            </div>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default SeriesInfoForm;

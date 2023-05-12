import React, { useEffect, useState } from 'react';
import { CustomForm, RadioGroupInput, SelectInput } from '@components/form';
import { SubmitButton, CustomButton } from '@components/buttons';
import { Form, message } from 'antd';
import CertificateModal from '@components/Modals/CertificateModal';
import { DEFAULT_TEMPLATE_CERTIFICATE } from '@config/constants';
import { saveEventFinnish, saveEventFinnishDraft } from '@api/event';
import { PATHS } from '@config/paths';
import { useHistory } from 'react-router-dom';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import CouponFormInput from '@components/form/CouponFormInput';
import { transformData } from '@components/form/CouponFormInput/transformData';
import { dataSerialization } from '@utils/form';
import './styles.scss';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const SystemSettingForm = ({
  seriesOptions,
  eventDetail,
  rallyId,
  businessId,
  isBusiness
}) => {
  const [form] = Form.useForm();
  const [certificate, setCertificate] = useState(DEFAULT_TEMPLATE_CERTIFICATE);
  const [showModal, setShowModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isNextStep, setIsNextStep] = useState(true);
  const [couponInfo, setCouponInfo] = useState();
  const history = useHistory();

  const rallyCompletionRewardOptions = [
    {
      value: 'yes',
      label: '賞状画像（デフォルト）'
    }
  ];

  const onFinish = async values => {
    try {
      setIsSubmit(true);
      const params = {
        serie_id: values?.serie_id,
        certificate_image_template_attributes: certificate
      };
      const couponData = await transformData(values);
      if (couponData) {
        params.coupon_reward_template_attributes = couponData;
      }

      const payload = dataSerialization(params);

      await saveEventFinnish(rallyId, payload);

      if (isNextStep) {
        pushMessage(MESSAGES.createSuccess);
        const businessDetailUrl = `${PATHS.businessDetail}?id=${businessId}`;
        const rallyManagement = PATHS.business.rallyManagement;
        history.push(isBusiness ? rallyManagement : businessDetailUrl);
      } else {
        onCreateSeries();
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  const onSaveDraft = async () => {
    try {
      setIsSubmit(true);
      const values = form.getFieldsValue();
      const params = {
        serie_id: values?.serie_id,
        certificate_image_template_attributes: certificate
      };
      const couponData = await transformData(values);
      if (couponData) {
        params.coupon_reward_template_attributes = couponData;
      }
      const payload = dataSerialization(params);
      await saveEventFinnishDraft(rallyId, payload);
      pushMessage(MESSAGES.saveDraft);
      const businessDetailUrl = `${PATHS.businessDetail}?id=${businessId}`;
      const rallyManagement = PATHS.business.rallyManagement;
      history.push(isBusiness ? rallyManagement : businessDetailUrl);
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  const onCreateSeries = () => {
    const asPath = history.location?.pathname;
    const search = history.location?.search;
    const url = asPath + search;
    const createGrandRallyUrl = isBusiness
      ? `${PATHS.business.newGranRally}?redirectTo=${url}`
      : `${PATHS.seriesNew}?redirectTo=${url}`;
    history.push(createGrandRallyUrl);
  };

  useEffect(() => {
    setCouponInfo(eventDetail?.coupon_reward_template);
    if (eventDetail?.certificate_image_template) {
      setCertificate(eventDetail?.certificate_image_template);
    }
    if (eventDetail?.serie_id) {
      form.setFieldsValue({
        serie_id: eventDetail?.serie_id
      });
    }
    // eslint-disable-next-line
  }, [eventDetail]);

  return (
    <div className="system-setting-info">
      <div className="system-setting-info-title">システム設定</div>
      <div className="system-setting-info-body">
        <CustomForm
          {...formItemLayout}
          name="system-setting"
          autoComplete="off"
          className="system-setting-form"
          onFinish={onFinish}
          form={form}
        >
          <RadioGroupInput
            label="ラリー制覇報酬"
            radioOptions={rallyCompletionRewardOptions}
            radioProps={{ value: 'yes' }}
            extraRow={
              <CustomButton onClick={() => setShowModal(true)}>
                賞状を編集
              </CustomButton>
            }
          />
          <CouponFormInput
            form={form}
            couponInfo={couponInfo}
            isEdit={!!couponInfo}
            isCreate={true}
          />
          <SelectInput
            className="series-setting"
            label="グランドラリー設定"
            name="serie_id"
            selectOptions={seriesOptions}
            extra={
              <div className="series-extra">
                <div className="series-extra-description">
                  作成したラリーをグランドラリーごとにまとめる機能です。
                  <br />
                  スポット数の多いラリーを作成する際はこちらの機能をご利用ください。
                </div>
                <CustomButton
                  onClick={() => setIsNextStep(false)}
                  htmlType="submit"
                >
                  新しいグランドラリーを作成
                </CustomButton>
              </div>
            }
          />

          <div className="system-setting-info-actions">
            <CustomButton
              className="btn-action"
              onClick={onSaveDraft}
              disabled={isSubmit}
            >
              下書き保存
            </CustomButton>
            <SubmitButton
              className="btn-action"
              text="登録完了"
              disabled={isSubmit}
              loading={isSubmit}
              onClick={() => setIsNextStep(true)}
            />
          </div>
        </CustomForm>
      </div>
      <CertificateModal
        visible={showModal}
        certificate={certificate}
        setCertificate={setCertificate}
        name={eventDetail?.name}
        creator={eventDetail?.owner_info?.business_name}
        onVisible={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default SystemSettingForm;

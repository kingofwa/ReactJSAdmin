import React, { useEffect, useState } from 'react';
import {
  CustomForm,
  TextInput,
  TextAreaInput,
  NumberInput,
  RadioGroupInput
} from '@components/form';
import { SubmitButton, CustomButton } from '@components/buttons';
import { Form, Image } from 'antd';
import RelatedLinks from '@components/Event/RelatedLinks';
import LocationAutoComplete from '@components/LocationAutoComplete/LocationAutoComplete';
import Map from '@components/Map';
import { isEmpty, map, get } from 'lodash';
import { ERROR_MESSAGES } from '@config/messages';
import { SPOT_STATUS } from '@config/constants';
import { EVENT_STATUS, QrCodeEnum } from 'config/constants';
import CouponFormInput from '@components/form/CouponFormInput';
import { srcToFile } from '@utils/image';
import CustomUploadPhoto from '@components/CustomUploadPhoto';
import './styles.scss';

const SpotSettingForm = ({
  spotData,
  locationInfo,
  setLocationInfo = () => {},
  hasPlayer,
  setLocationPhoto = () => {},
  onSubmit = () => {},
  setIsDraft = () => {},
  isEdit,
  locationPhoto,
  eventDetail,
  form,
  isCreate
}) => {
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };
  const [qrCode, setQrCode] = useState(QrCodeEnum.GPS);
  const [couponInfo, setCouponInfo] = useState();
  const [photos, setPhotos] = useState([]);
  const [images, setImages] = useState([]);

  const onChangePhotos = values => {
    setImages(values);
  };

  const initData = async () => {
    setImages(spotData?.photo_urls);
    setPhotos(spotData?.photo_urls);
    const listPhotos = await srcToFile(spotData?.photo_urls);
    const images = map(listPhotos, file => get(file, ['originFileObj']));
    const isUnregistered = spotData?.status === SPOT_STATUS.unregistered;
    const data = {
      name: isUnregistered ? '' : spotData?.name,
      description: spotData?.description || '',
      prefecture: null,
      address: spotData?.address,
      range: spotData?.range,
      lat: spotData?.lat,
      lng: spotData?.lng,
      related_links_attributes: spotData?.related_links || [],
      photos: images,
      allow_type_of_checkin: spotData?.allow_type_of_checkin
    };
    if (spotData?.allow_type_of_checkin) {
      setQrCode(spotData?.allow_type_of_checkin);
    }
    form.setFieldsValue(data);
  };

  useEffect(() => {
    if (!isEmpty(spotData)) {
      initData();
      if (spotData?.coupon_reward_template?.id) {
        setCouponInfo(spotData.coupon_reward_template);
      }
    } else {
      form.setFieldsValue({
        range: 105,
        allow_type_of_checkin: QrCodeEnum.GPS
      });
    }
    // eslint-disable-next-line
  }, [spotData]);

  const isDraft = eventDetail?.status === EVENT_STATUS.DRAFT;
  const renderSpotLocation = () => {
    return (
      <>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          label="位置情報設定"
          className="location-input"
        >
          <div className="spot-description">
            下記のいずれかの方法で位置情報を設定してください。
            <br />
            ❶スポット名を入力して検索
            <br />
            ❷住所を入力して検索
          </div>

          <LocationAutoComplete
            setLocationInfo={setLocationInfo}
            address={spotData?.address}
            disabled={hasPlayer}
            setLocationPhoto={setLocationPhoto}
          />

          <div className="map">
            <Map coordinates={locationInfo} />
          </div>
          <div className="map-row range">
            <span className="map-label">ピンからの範囲</span>
            <NumberInput
              name="range"
              suffix="m"
              required
              inputOpts={{ defaultValue: 105 }}
              extraRules={[
                {
                  pattern:
                    /^0*([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|1[0-9]{3}|2000)$/,
                  message: ERROR_MESSAGES.invalidRange
                }
              ]}
            />
          </div>
        </Form.Item>
      </>
    );
  };

  const renderUploadPhoto = () => {
    return (
      <CustomUploadPhoto
        label="スポット画像"
        form={form}
        name="photos"
        photos={photos}
        onChangePhotos={onChangePhotos}
        extra={
          <div className="spot-extra">
            ※検索結果に応じてGoogleマップから自動で写真が選択されています。
            <br />
            ※お好きな写真に変更することも可能です。
            <br />
            ※Googleマップの画像がない場合は、みんラリのデフォルト画像が表示されます。
          </div>
        }
      />
    );
  };

  const renderGooglePhoto = () => {
    const googlePhoto = locationPhoto || spotData?.google_image_url;

    if (googlePhoto && isEmpty(images)) {
      return (
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          label="Googleマップの画像"
          className="google-photo"
        >
          <Image src={googlePhoto} alt="google-photo" />
        </Form.Item>
      );
    }
    return null;
  };

  const renderSpotName = () => {
    return (
      <TextInput
        name="name"
        label="スポット名"
        required
        placeholder="最大40文字"
        disabled={hasPlayer}
        rules={[
          {
            max: 40,
            message: ERROR_MESSAGES.maxLength.replace(/:count/, 40)
          }
        ]}
      />
    );
  };

  const renderDescription = () => {
    return (
      <TextAreaInput
        label="スポット解説"
        name="description"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        extra={
          <div className="spot-extra">
            ※ラリー開始後の変更はできませんが、追記することは可能です。
          </div>
        }
        placeholder="スポットの説明や特徴、マル秘情報などを自由に入力してください。（推奨500文字以内）"
        rules={[
          {
            max: 500,
            message: ERROR_MESSAGES.maxLength.replace(/:count/, 500)
          }
        ]}
      />
    );
  };

  const qrCodeOptions = [
    {
      label: 'GPSのみ',
      value: QrCodeEnum.GPS
    },
    {
      label: 'GPS＋QRコード',
      value: QrCodeEnum.QR_CODE
    }
  ];

  const onQrCodeSetting = e => {
    if (e?.target?.value) {
      setQrCode(e?.target?.value);
    }
  };

  const renderQrCode = () => {
    return (
      <RadioGroupInput
        label="チェックイン方法"
        radioOptions={qrCodeOptions}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        radioProps={{ value: qrCode, disabled: spotData?.has_checkins }}
        onChange={onQrCodeSetting}
        name="allow_type_of_checkin"
      />
    );
  };

  return (
    <>
      <div className="spot-setting-info">
        <div className="spot-setting-info-title">
          {isEdit ? spotData?.name : 'スポット設定'}
        </div>
        <div className="spot-setting-info-body">
          <CustomForm
            {...formItemLayout}
            name="spot-setting"
            autoComplete="off"
            className="spot-setting-form"
            onFinish={onSubmit}
            form={form}
          >
            {renderSpotLocation()}
            {renderSpotName()}
            {renderUploadPhoto()}
            {renderGooglePhoto()}
            {renderDescription()}

            <RelatedLinks
              label="関連リンク"
              extra="このスポットに関連したリンクを設定することができます。"
            />
            {renderQrCode()}
            <CouponFormInput
              form={form}
              couponInfo={couponInfo}
              isEdit={isEdit}
              isCreate={isCreate}
            />
            <div className="spot-setting-info-actions">
              {isDraft && (
                <CustomButton
                  className="btn-action"
                  onClick={() => setIsDraft(true)}
                  htmlType="submit"
                  disabled={hasPlayer}
                >
                  下書き保存
                </CustomButton>
              )}
              <SubmitButton
                className="btn-action"
                text="登録して戻る"
                onClick={() => setIsDraft(false)}
              />
            </div>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default SpotSettingForm;

import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Radio } from 'antd';
import {
  TextInput,
  RadioGroupInput,
  TextAreaInput,
  NumberInput
} from '@components/form';
import UploadPhotos from '@components/UploadPhotos';
import { REGEX_SPECIAL_CHARS } from '@utils/validate';
import { ERROR_MESSAGES } from '@config/messages';
import { FORMATTER } from '@config/constants';
import DateInput from '@components/form/DateInput';
import moment from 'moment';
import { COUPON_TYPE } from '@config/constants';
import ApplicationForm from './elements/ApplicationForm/ApplicationForm';
import './Styles.scss';

const CouponFormInput = ({
  form,
  couponInfo,
  isEnable = COUPON_TYPE.NO_COUPON,
  isEdit,
  isBusiness
}) => {
  const [issuesPerUser, setIssuesPerUser] = useState(0);
  const [issuesPerSheet, setIssuesPerSheet] = useState(0);
  const [isRequirePerUser, setIsRequirePerUser] = useState();
  const [isRequirePerSheet, setIsRequirePerSheet] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [isRequireImage, setRequireImage] = useState(true);
  const [imageFile, setImageFile] = useState();
  const [rewardType, setRewardType] = useState(isEnable);

  const rewardOption = [
    {
      label: 'なし',
      value: COUPON_TYPE.NO_COUPON
    },
    {
      label: 'クーポン',
      value: COUPON_TYPE.HAS_COUPON
    }
  ];

  const optionEnableCoupon = isBusiness
    ? [
        ...rewardOption,
        {
          label: '応募フォーム',
          value: COUPON_TYPE.APPLICATION_FORM
        }
      ]
    : rewardOption;

  const initData = couponInfo => {
    setRequireImage(true);
    if (couponInfo) {
      setRequireImage(false);
      form.setFieldsValue({ couponId: couponInfo.id });
      form.setFieldsValue({ hasCoupon: COUPON_TYPE.HAS_COUPON });
      setRewardType(COUPON_TYPE.HAS_COUPON);
      let limit_number_of_issues_per_user =
        couponInfo.limit_number_of_issues_per_user;
      if (limit_number_of_issues_per_user) {
        form.setFieldsValue({ issuesPerUser: 1 });
        form.setFieldsValue({
          issue_per_user: limit_number_of_issues_per_user
        });
        setIssuesPerUser(1);
      }
      let limit_number_of_times_of_use_per_sheet =
        couponInfo.limit_number_of_times_of_use_per_sheet;
      if (limit_number_of_times_of_use_per_sheet) {
        form.setFieldsValue({ issuesPerSheet: 1 });
        form.setFieldsValue({
          issue_per_sheet: limit_number_of_times_of_use_per_sheet
        });
        setIssuesPerSheet(1);
      }
      form.setFieldsValue({
        coupon_reward_template_attributes_name: couponInfo.name
      });
      form.setFieldsValue({
        coupon_reward_template_attributes_description: couponInfo.description
      });
      setExpirationDate(moment(couponInfo.expiration_date));
      form.setFieldsValue({
        expirationDate: moment(couponInfo.expiration_date)
      });
      setImageFile({
        name: 'coupon_reward_template_attributes_photos',
        url: couponInfo?.image_url
      });
    } else {
      form.setFieldsValue({ couponId: '' });
      form.setFieldsValue({ issuesPerUser: issuesPerUser });
      form.setFieldsValue({ issuesPerSheet: issuesPerSheet });
    }
  };
  useEffect(() => {
    if (isEdit) {
      initData(couponInfo);
    } else {
      form.setFieldsValue({ issuesPerUser: issuesPerUser });
      form.setFieldsValue({ issuesPerSheet: issuesPerSheet });
    }
    // eslint-disable-next-line
  }, [couponInfo]);

  const handlePerUser = e => {
    setIssuesPerUser(1);
    form.setFieldsValue({ issuesPerUser: 1 });
  };

  const handleChangePerUser = e => {
    setIsRequirePerUser(false);
    if (e?.target?.value === 1) {
      setIsRequirePerUser(true);
    }
    form.setFieldsValue({ issue_per_user: '' });
  };

  const handlePerSheet = e => {
    setIssuesPerSheet(1);
    form.setFieldsValue({ issuesPerSheet: 1 });
  };

  const handleChangePerSheet = e => {
    setIsRequirePerSheet(false);
    if (e?.target?.value === 1) {
      setIsRequirePerSheet(true);
    }
    form.setFieldsValue({ issue_per_sheet: '' });
  };

  const onChangeDate = value => {
    setExpirationDate(value);
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, expiration_date: value });
    form.setFieldsValue({ expirationDate: value });
  };

  const onChangeEnableCoupon = e => {
    setRewardType(e?.target?.value);
    form.setFieldsValue({ hasCoupon: e?.target?.value });
  };

  const disabledDate = current => {
    let customDate = moment().format('YYYY-MM-DD');
    return current && current <= moment(customDate, 'YYYY-MM-DD');
  };

  const renderFormCoupon = () => {
    if (rewardType === COUPON_TYPE.HAS_COUPON) {
      return (
        <Row gutter={[8, 32]}>
          <Col span={4}></Col>
          <Col span={20} className="form-coupon">
            <UploadPhotos
              form={form}
              label="クーポン画像"
              name="coupon_reward_template_attributes_photos"
              showDeleteIcon={false}
              imageFile={imageFile}
              required={isRequireImage}
            />
            <Form.Item
              className="form-item"
              label="クーポン名"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 10 }}
              rules={[
                { required: true, message: ERROR_MESSAGES.empty },
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
              required
            >
              <TextInput
                placeholder="制覇記念クーポン"
                name="coupon_reward_template_attributes_name"
                rules={[
                  {
                    max: 20,
                    message: ERROR_MESSAGES.maxLength.replace(/:count/, 20)
                  }
                ]}
                required
              />
            </Form.Item>

            <TextAreaInput
              label="説明文"
              name="coupon_reward_template_attributes_description"
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
                name="issuesPerUser"
                defaultValue={0}
                className="issue-group"
                onChange={handleChangePerUser}
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
                      required={isRequirePerUser}
                      onChange={handlePerUser}
                    />
                  </Form.Item>
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="issuesPerSheet"
              className="form-item"
              label="利用回数"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              required
            >
              <Radio.Group
                name="issuesPerSheet"
                defaultValue={0}
                className="issue-group"
                onChange={handleChangePerSheet}
              >
                <Radio value={0}>無制限</Radio>
                <Radio value={1} className="radio-with-textbox">
                  1枚あたり
                  <Form.Item
                    className="extra"
                    labelCol={{ span: 14 }}
                    wrapperCol={{ span: 10 }}
                  >
                    <NumberInput
                      suffix="回"
                      name="issue_per_sheet"
                      required={isRequirePerSheet}
                      onChange={handlePerSheet}
                    />
                  </Form.Item>
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="使用期限"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 10 }}
              name="expirationDate"
              rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
            >
              <Row>
                <Col>
                  <DateInput
                    className="date-picker"
                    inputProps={{
                      format: FORMATTER.date,
                      value: expirationDate,
                      onChange: onChangeDate,
                      placeholder: 'YYYY/MM/DD',
                      disabledDate: disabledDate
                    }}
                  />
                </Col>
                <Col>
                  <label className="label-date-picker">まで</label>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              className="form-item-hidden"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 10 }}
            >
              <TextInput name="couponId" />
            </Form.Item>
          </Col>
        </Row>
      );
    }
    return null;
  };

  const renderApplicationForm = () => {
    if (rewardType === COUPON_TYPE.APPLICATION_FORM) {
      return <ApplicationForm form={form} />;
    }
    return null;
  };

  return (
    <React.Fragment>
      <RadioGroupInput
        className="coupon-setting"
        label="追加報酬"
        name="hasCoupon"
        radioOptions={optionEnableCoupon}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onChange={onChangeEnableCoupon}
        radioProps={{ value: rewardType }}
      />
      {renderFormCoupon()}
      {renderApplicationForm()}
    </React.Fragment>
  );
};

export default CouponFormInput;

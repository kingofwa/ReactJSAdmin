import React, { useEffect, useState } from 'react';
import { CustomForm, TextInput, RadioGroupInput } from '@components/form';
import { SubmitButton } from '@components/buttons';
import UploadPhotos from '@components/UploadPhotos';
import CustomButton from '@components/buttons/custom-button';
import { useHistory } from 'react-router-dom';
import { PATHS } from '@config/paths';
import './styles.scss';

const formName = 'banner-info';

const BannerInfoForm = ({
  form,
  onSubmit,
  isSubmit,
  imageFile,
  data,
  isEdit
}) => {
  const history = useHistory();
  const [status, setStatus] = useState();
  useEffect(() => {
    if (data) {
      setStatus(data?.status);
    }
  }, [data]);

  const onChangeStatus = e => {
    setStatus(e?.target?.value);
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };

  const publishingSettingsOptions = [
    {
      label: '公開',
      value: 'active'
    },
    {
      label: '非公開',
      value: 'deactive'
    }
  ];

  const onCancel = () => {
    history.push(PATHS.bannerAdministration);
  };

  return (
    <>
      <div className="banner-info">
        <div className="banner-info-title">バナー情報</div>
        <div className="banner-info-body">
          <CustomForm
            {...formItemLayout}
            name={formName}
            autoComplete="off"
            className="banner-info-form"
            onFinish={onSubmit}
            form={form}
          >
            <TextInput name="name" label="バナー名" required />
            <UploadPhotos
              form={form}
              label="バナー画像"
              required={!isEdit}
              imageFile={imageFile}
              name="photos"
              showDeleteIcon={false}
            />
            <TextInput
              name="url"
              label="リンク先URL"
              rules={[
                {
                  type: 'url',
                  message:
                    '入力形式が正しくありません。もう一度入力してください。'
                }
              ]}
            />
            <RadioGroupInput
              label="公開設定"
              name="status"
              radioOptions={publishingSettingsOptions}
              required
              radioProps={{ value: status }}
              onChange={onChangeStatus}
            />

            <div className="banner-info-actions">
              <CustomButton
                type="primary"
                className="btn-action"
                disabled={isSubmit}
                onClick={onCancel}
              >
                キャンセル
              </CustomButton>
              <SubmitButton
                text={isEdit ? '更新' : '登録'}
                className="btn-action"
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

export default BannerInfoForm;

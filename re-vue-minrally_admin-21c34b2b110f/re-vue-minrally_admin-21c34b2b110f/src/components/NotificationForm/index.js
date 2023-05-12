import React, { useState, useEffect } from 'react';
import {
  CustomForm,
  TextInput,
  RadioGroupInput,
  TextAreaInput,
  SelectInput
} from '@components/form';
import CustomButton from '@components/buttons/custom-button';
import { SubmitButton } from '@components/buttons';
import { useHistory } from 'react-router-dom';
import { PATHS } from '@config/paths';
import './styles.scss';

const NotificationForm = ({
  form,
  onSubmit,
  data,
  isEdit,
  isSubmit = false
}) => {
  const [status, setStatus] = useState();
  const history = useHistory();

  const onChangeStatus = e => {
    setStatus(e?.target?.value);
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };

  const labelOptions = [
    {
      value: 'system',
      label: 'システム'
    },
    {
      value: 'campaign',
      label: 'キャンペーン'
    },

    {
      value: 'other',
      label: 'その他'
    }
  ];

  const statusOptions = [
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
    history.push(PATHS.notificationManagement);
  };

  useEffect(() => {
    if (data) {
      setStatus(data?.status);
    }
  }, [data]);

  return (
    <>
      <div className="notification-info">
        <div className="notification-info-title">お知らせ内容</div>
        <div className="notification-info-body">
          <CustomForm
            {...formItemLayout}
            name="notification-info"
            autoComplete="off"
            className="notification-info-form"
            onFinish={onSubmit}
            form={form}
          >
            {isEdit ? (
              <TextInput
                name="kind"
                label="ラベル"
                disabled={isEdit}
                readOnly={isEdit}
              />
            ) : (
              <SelectInput
                label="ラベル"
                name="kind"
                selectOptions={labelOptions}
                required
              />
            )}

            <TextInput
              name="title"
              label="タイトル"
              required={!isEdit}
              disabled={isEdit}
              readOnly={isEdit}
            />

            <TextAreaInput
              label="内容"
              name="content"
              required={!isEdit}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              disabled={isEdit}
              readOnly={isEdit}
            />

            <RadioGroupInput
              label="ステータス"
              name="status"
              radioOptions={statusOptions}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              required
              radioProps={{ value: status }}
              onChange={onChangeStatus}
            />

            <div className="notification-info-actions">
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
                disabled={isSubmit}
              />
            </div>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default NotificationForm;

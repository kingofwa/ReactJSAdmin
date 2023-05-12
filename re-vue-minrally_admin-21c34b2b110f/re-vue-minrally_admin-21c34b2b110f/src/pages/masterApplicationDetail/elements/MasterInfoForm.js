import React from 'react';
import { CustomForm, TextInput, TextAreaInput } from '@components/form';
import { map, size } from 'lodash';
import './styles.scss';

const formName = 'master-info-detail';

const MasterInfoForm = ({ form }) => {
  const { getFieldValue } = form;
  const { referenceURL } = getFieldValue();

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };

  return (
    <>
      <div className="master-info-form">
        <div className="master-info-form-title">ユーザー情報</div>
        <div className="master-info-form-body">
          <CustomForm
            {...formItemLayout}
            name={formName}
            autoComplete="off"
            form={form}
          >
            <TextInput name="userName" label="ユーザー名" disabled readOnly />
            <TextInput
              name="collaborativeSNS"
              label="連携SNS"
              disabled
              readOnly
            />
            <TextInput name="fullName" label="氏名" disabled readOnly />
            <TextInput
              name="birthDate"
              label="生年月日"
              disabled
              readOnly
              // initialValue={moment(birthDate).format(DATE_LINE)}
            />
            <TextInput name="gender" label="性別" disabled readOnly />
            <TextInput name="prefectures" label="都道府県" disabled readOnly />
            <TextInput name="profession" label="職業" disabled readOnly />
            <TextInput name="email" label="メールアドレス" disabled readOnly />
            <TextAreaInput
              name="rallyContent"
              label="自己PRと作りたいラリー内容"
              disabled
              readOnly
            />
            {size(referenceURL) > 0 ? (
              map(referenceURL, (url, index) => (
                <TextInput
                  name=""
                  label={index === 0 ? '参考URL' : ' '}
                  disabled
                  readOnly
                  initialValue={url}
                />
              ))
            ) : (
              <TextInput
                name="referenceURL"
                label="参考URL"
                disabled
                readOnly
              />
            )}
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default MasterInfoForm;

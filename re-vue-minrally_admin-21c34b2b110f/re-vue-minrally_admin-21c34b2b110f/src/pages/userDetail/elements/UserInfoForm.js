import React from 'react';
import { CustomForm, TextInput } from '@components/form';
import './styles.scss';

const formName = 'user-info';

const UserInfoForm = ({ form }) => {
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };

  return (
    <>
      <div className="user-card-info">
        <div className="user-card-info-title">ユーザー情報</div>
        <div className="user-card-info-body">
          <CustomForm
            {...formItemLayout}
            name={formName}
            autoComplete="off"
            className="user-info-form"
            form={form}
          >
            <TextInput name="userName" label="ユーザー名" disabled readOnly />
            <TextInput name="birthDate" label="生まれた年" disabled readOnly />
            <TextInput name="gender" label="性別" disabled readOnly />
            <TextInput name="prefectures" label="都道府県" disabled readOnly />
            <TextInput
              name="masterRegister"
              label="マスター登録"
              disabled
              readOnly
            />
            <TextInput name="fullName" label="氏名" disabled readOnly />
            <TextInput name="profession" label="職業" disabled readOnly />
            <TextInput name="email" label="メールアドレス" disabled readOnly />
          </CustomForm>
        </div>
      </div>
    </>
  );
};

export default UserInfoForm;

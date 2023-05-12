import React from 'react';
import {
  CustomForm,
  SelectInput,
  TextInput,
  DateRangeInput
} from '@components/form';
import { SubmitButton } from '@components/buttons';
import { Button, Form } from 'antd';

import './styles.scss';

const FilterSearch = ({ onSearchUser, fetchUsers, setCurrentParams }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    setCurrentParams({});
    fetchUsers();
  };

  const masterOptions = [
    {
      label: 'あり',
      value: 'yes'
    },
    {
      label: 'なし',
      value: 'no'
    }
  ];

  return (
    <div className="filter-search">
      <p className="filter-search-title">条件検索</p>
      <CustomForm
        name="search"
        onFinish={onSearchUser}
        autoComplete="off"
        // loading={submitting}
        className="search-form"
        form={form}
      >
        <TextInput
          name="user_name"
          label="ユーザー名"
          inputProps={{ placeholder: '企業・団体名を入力' }}
        />

        <SelectInput
          label="マスター登録"
          name="master_registration"
          selectOptions={masterOptions}
        />

        <TextInput
          name="email"
          label="メールアドレス"
          inputProps={{ placeholder: 'メールアドレスを入力' }}
          // type="email"
        />

        <DateRangeInput name="period" label="登録期間" />

        <div className="filter-actions">
          <SubmitButton text="絞り込む" className="btn-primary" />
          <Button type="link" className="btn-reset" onClick={onReset}>
            条件をリセットする
          </Button>
        </div>
      </CustomForm>
    </div>
  );
};

export default FilterSearch;

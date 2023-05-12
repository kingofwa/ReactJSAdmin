import React from 'react';
import { CustomForm, TextInput, DateRangeInput } from '@components/form';
import { SubmitButton } from '@components/buttons';
import { Button, Form } from 'antd';

import './styles.scss';

const FilterSearch = ({
  onSearchBusiness,
  fetchBusiness,
  setCurrentParams
}) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    setCurrentParams({});
    fetchBusiness();
  };

  return (
    <div className="filter-search">
      <p className="filter-search-title">条件検索</p>
      <CustomForm
        name="search"
        onFinish={onSearchBusiness}
        autoComplete="off"
        // loading={submitting}
        className="search-form"
        form={form}
      >
        <TextInput
          name="business_name"
          label="事業者名"
          inputProps={{ placeholder: '企業・団体名を入力' }}
        />

        <TextInput
          name="person_in_charge_name"
          label="担当者名"
          inputProps={{ placeholder: '担当者名を入力' }}
        />

        <TextInput
          name="email"
          label="メールアドレス"
          inputProps={{ placeholder: 'メールアドレスを入力' }}
          type="email"
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

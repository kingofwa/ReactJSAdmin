import React from 'react';
import { Form, Select } from 'antd';
import { map, replace } from 'lodash';
import { ERROR_MESSAGES } from '@config/messages';
import './Styles.scss';

const HashTagsInput = ({ form, name = 'tags', required = true }) => {
  const onChangeTag = tags => {
    const newTag = map(tags, tag => {
      const tagValue = replace(tag, new RegExp(/#/, 'g'), '');
      const newTagValue = replace(tagValue, new RegExp(/\s/g, 'g'), '');
      return `#${newTagValue}`;
    });
    form.setFieldsValue({
      [name]: newTag
    });
  };

  return (
    <Form.Item
      name={name}
      label="ハッシュタグ"
      rules={[{ required, message: ERROR_MESSAGES.empty }]}
      extra={
        <div className="input-extra">
          ※複数のタグを付けるときは、タグごとに「エンター」「改行」を押してください。
        </div>
      }
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 15 }}
    >
      <Select
        mode="tags"
        placeholder="#東急電鉄 #鉄道"
        dropdownStyle={{ display: 'none' }}
        className="hash-tags-input"
        onChange={onChangeTag}
      />
    </Form.Item>
  );
};

export default HashTagsInput;

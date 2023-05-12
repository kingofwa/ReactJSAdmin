import React from 'react';
import { Table, Dropdown, Space, Menu, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { NUM_PER_PAGE_RECOMMEND } from '@config/constants';
import Pager from '@components/Pager';
import moment from 'moment-timezone';
import { DATE_DEFAULT } from '@utils/date';
import { updateFeaturedHashtags } from '@api/tags';
import { generateFormData } from '@utils/form';
import { size } from 'lodash';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import './styles.scss';

const HashtagTable = ({
  data,
  onPageChange,
  pagination,
  loading,
  reloadData
}) => {
  const pageSize = NUM_PER_PAGE_RECOMMEND;

  const columns = [
    {
      title: 'ハッシュタグ名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '登録日',
      dataIndex: 'registration_date',
      key: 'registration_date',
      render: (_, record) =>
        moment(record.created_at).tz('Asia/Tokyo').format(DATE_DEFAULT)
    },
    {
      title: 'メニュー',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle" className="cursor-pointer">
          <Dropdown overlay={menu(record)}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      )
    }
  ];

  const onMenuClick = (item, action) => {
    switch (action) {
      case 'remove':
        updateFeature(item);
        break;
      default:
        break;
    }
  };

  const updateFeature = async tag => {
    try {
      const params = {
        list_delete_names: tag?.name
      };
      const payload = await generateFormData(params);
      await updateFeaturedHashtags(payload);
      pushMessage(MESSAGES.deleteSuccess);
      reloadData();
    } catch (error) {
      message.error(error);
    }
  };

  const menu = item => (
    <Menu
      items={[
        {
          key: item.id,
          label: (
            <div onClick={() => onMenuClick(item, 'remove')}>
              注目から削除する
            </div>
          )
        }
      ]}
    />
  );

  return (
    <div className="recommendation-tab">
      <Table
        columns={columns}
        dataSource={data}
        size={'small'}
        rowKey="name"
        className="custom-table"
        loading={loading}
      />
      <div className="table__statistic">
        {pagination?.total}件中{size(data)}件表示
      </div>
      <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
    </div>
  );
};

export default HashtagTable;

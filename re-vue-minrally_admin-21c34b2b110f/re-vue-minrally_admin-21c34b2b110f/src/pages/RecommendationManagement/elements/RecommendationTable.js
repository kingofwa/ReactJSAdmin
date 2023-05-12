import React from 'react';
import { Table, Dropdown, Space, Menu, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { NUM_PER_PAGE_RECOMMEND } from '@config/constants';
import Pager from '@components/Pager';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import { updateRecommended } from '@api/recommendation';
import { generateFormData } from '@utils/form';
import { size } from 'lodash';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import './styles.scss';

const RecommendationTable = ({
  data,
  onPageChange,
  pagination,
  isGrand,
  loading,
  reloadData
}) => {
  const pageSize = NUM_PER_PAGE_RECOMMEND;
  const renderStatus = status => {
    switch (status) {
      case 'draft':
        return '下書き';
      case 'published':
        return '公開中';
      default:
        return '-';
    }
  };
  let columns = [
    {
      title: isGrand ? 'グランドラリー名' : 'ラリー名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'ラリーマスター名',
      dataIndex: 'masterName',
      key: 'masterName'
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: status => renderStatus(status)
    },
    {
      title: '登録日',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => moment(record.created_at).format(DATE_DEFAULT)
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

  const columnsGrandRally = [
    {
      title: isGrand ? 'グランドラリー名' : 'ラリー名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'ラリーマスター名',
      dataIndex: 'masterName',
      key: 'masterName'
    },
    // {
    //   title: 'ステータス',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: status => renderStatus(status)
    // },
    {
      title: '登録日',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => moment(record.created_at).format(DATE_DEFAULT)
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
  if (isGrand) {
    columns = columnsGrandRally;
  }

  const handleRemoveRecommend = async item => {
    try {
      const params = {
        type: isGrand ? 'grand' : 'rally',
        remove_recommend: item.name
      };
      const payload = await generateFormData(params);
      await updateRecommended(payload);
      pushMessage(MESSAGES.deleteSuccess);
      reloadData();
    } catch (error) {
      message.error(error);
    }
  };

  const menu = (item, isGrand) => (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div onClick={() => handleRemoveRecommend(item)}>
              おすすめから削除する
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
        rowKey="id"
        className="custom-table"
        loading={loading}
      />
      <div className="table__statistic">
        {pagination?.total}件中 {size(data)}件表示
      </div>
      <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
    </div>
  );
};

export default RecommendationTable;

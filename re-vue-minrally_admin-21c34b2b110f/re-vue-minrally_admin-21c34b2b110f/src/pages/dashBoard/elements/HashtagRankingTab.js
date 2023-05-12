import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import './styles.scss';

const HashtagRankingTab = ({ data, loading, onSortStatistics = () => {} }) => {
  const columns = [
    {
      render: (_text, _record, index) => index + 1,
      width: '5%'
    },
    {
      title: 'ハッシュタグ名',
      dataIndex: 'name',
      key: 'name',
      render: name => name || '-',
      width: '35%'
    },
    {
      title: '検索回数',
      dataIndex: 'searching_count',
      key: 'searching_count',
      sorter: true,
      defaultSortOrder: 'descend',
      width: '20%'
      // sorter: (a, b) => a.searching_count - b.searching_count,
      // render: searching_count => searching_count
    },
    {
      title: '利用ラリー数',
      dataIndex: 'taggings_count',
      key: 'taggings_count',
      sorter: true,
      width: '20%'
      // defaultSortOrder: 'descend'
      // sorter: (a, b) => a.taggings_count - b.taggings_count,
      // render: taggings_count => taggings_count
    },
    {
      title: '登録日',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '20%',
      render: created_at =>
        created_at ? moment(created_at).format(DATE_DEFAULT) : '-'
    }
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    onSortStatistics(sorter?.field, sorter?.order);
  };

  return (
    <div className="hashtag-ranking-tab">
      <label className="tab-title">ハッシュタグ利用ランキング</label>
      <Table
        columns={columns}
        dataSource={data}
        size={'small'}
        pagination={false}
        rowKey="id"
        className="custom-table"
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default HashtagRankingTab;

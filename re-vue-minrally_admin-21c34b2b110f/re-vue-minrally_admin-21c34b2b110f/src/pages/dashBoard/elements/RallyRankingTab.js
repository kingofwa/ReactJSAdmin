import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import './styles.scss';

const RallyRankingTab = ({ data, loading, onSortStatistics = () => {} }) => {
  const columns = [
    {
      render: (_text, _record, index) => index + 1,
      width: '5%'
    },
    {
      title: 'ラリー名',
      dataIndex: 'name',
      key: 'name',
      render: name => name || '-',
      width: '30%'
    },
    {
      title: 'マスター/事業者名',
      dataIndex: 'owner_name',
      key: 'owner_name',
      render: owner_name => owner_name || '-',
      width: '20%'
    },
    {
      title: '参加者数',
      dataIndex: 'player_count',
      key: 'player_count',
      sorter: true,
      defaultSortOrder: 'descend',
      width: '15%'
      // sorter: (a, b) => a.player_count - b.player_count,
      // render: player_count => player_count
    },
    {
      title: 'チェックイン数',
      dataIndex: 'checked_count',
      key: 'checked_count',
      sorter: true,
      width: '15%'
      // defaultSortOrder: 'descend',
      // sorter: (a, b) => a.checked_count - b.checked_count,
      // render: checked_count => checked_count
    },
    {
      title: '登録日',
      dataIndex: 'created_at',
      key: 'created_at',
      render: created_at =>
        created_at ? moment(created_at).format(DATE_DEFAULT) : '-',
      width: '15%'
    }
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    onSortStatistics(sorter?.field, sorter?.order);
  };

  return (
    <div className="hashtag-ranking-tab">
      <label className="tab-title">ラリーランキング</label>
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

export default RallyRankingTab;

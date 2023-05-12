import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import { DASH_BOARD_SORT_TYPE_ENUM } from '@config/constants';
import { cloneDeep, filter } from 'lodash';
import './styles.scss';

const SpotRankingTab = ({ data, loading, onSortStatistics = () => {} }) => {
  const columns = [
    {
      render: (_text, _record, index) => index + 1,
      width: '5%'
    },
    {
      title: 'スポット名',
      dataIndex: 'name',
      key: 'name',
      render: name => name || '-',
      width: '25%'
    },
    {
      title: 'ラリー名',
      dataIndex: 'game_name',
      key: 'game_name',
      render: value => value || '-',
      width: '15%'
    },
    {
      title: '参加者数',
      dataIndex: 'players_checked_count',
      key: 'players_checked_count',
      render: value => value || '-',
      width: '15%',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: 'チェックイン数',
      dataIndex: 'checked_count',
      key: 'checked_count',
      sorter: true,
      render: value => value || '-',
      width: '15%'
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

  const filteredData = () => {
    const newData = cloneDeep(data);
    return filter(newData, item => {
      return item.players_checked_count || item.checked_count;
    });
  };

  const handleTableChange = (_pagination, _filters, sorter) => {
    onSortStatistics(
      sorter?.field,
      sorter?.order,
      DASH_BOARD_SORT_TYPE_ENUM.SPOT
    );
  };

  return (
    <div className="hashtag-ranking-tab">
      <label className="tab-title">スポットデータ(上位10件)</label>
      <Table
        columns={columns}
        dataSource={filteredData()}
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

export default SpotRankingTab;

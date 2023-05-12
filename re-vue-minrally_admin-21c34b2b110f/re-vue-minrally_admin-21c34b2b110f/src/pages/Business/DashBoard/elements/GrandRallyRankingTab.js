import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { cloneDeep, filter } from 'lodash';
import { DATE_DEFAULT } from '@utils/date';
import { DASH_BOARD_SORT_TYPE_ENUM } from '@config/constants';
import './styles.scss';

const GrandRallyRankingTab = ({
  data,
  loading,
  onSortStatistics = () => {}
}) => {
  const filteredData = () => {
    const newData = cloneDeep(data);
    return filter(newData, item => {
      return (
        item.players_count ||
        item.checked_count ||
        item.players_finished_count ||
        item.games_count ||
        item.spots_count
      );
    });
  };

  const columns = [
    {
      render: (_text, _record, index) => index + 1,
      width: '5%'
    },
    {
      title: 'グランドラリー名',
      dataIndex: 'name',
      key: 'name',
      render: name => name || '-',
      width: '25%'
    },
    {
      title: '参加者数',
      dataIndex: 'players_count',
      key: 'players_count',
      render: value => value || '-',
      defaultSortOrder: 'descend',
      width: '10%',
      sorter: true
    },
    {
      title: 'チェックイン数',
      dataIndex: 'checked_count',
      key: 'checked_count',
      sorter: true,
      render: value => value || '-',
      width: '10%'
    },
    {
      title: '制覇者数',
      dataIndex: 'players_finished_count',
      key: 'players_finished_count',
      render: value => value || '-',
      sorter: true,
      width: '15%'
    },
    {
      title: '登録ラリー数',
      dataIndex: 'games_count',
      key: 'games_count',
      render: value => value || '-',
      sorter: true,
      width: '15%'
    },
    {
      title: '総スポット数',
      dataIndex: 'spots_count',
      key: 'spots_count',
      render: value => value || '-',
      sorter: true,
      width: '10%'
    },
    {
      title: '登録日',
      dataIndex: 'created_at',
      key: 'created_at',
      render: created_at =>
        created_at ? moment(created_at).format(DATE_DEFAULT) : '-',
      width: '10%'
    }
  ];

  const handleTableChange = (_pagination, _filters, sorter) => {
    onSortStatistics(
      sorter?.field,
      sorter?.order,
      DASH_BOARD_SORT_TYPE_ENUM.GRAND_RALLY
    );
  };

  return (
    <div className="hashtag-ranking-tab">
      <label className="tab-title">グランドラリーデータ(上位10件)</label>
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

export default GrandRallyRankingTab;

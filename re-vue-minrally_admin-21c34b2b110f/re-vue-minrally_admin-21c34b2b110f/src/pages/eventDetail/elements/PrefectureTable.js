import React from 'react';
import { Form, Table } from 'antd';
import './styles.scss';

const PrefectureTable = ({ data, loading, isAnalysisAll }) => {
  const prefectureColumns = [
    {
      title: '都道府県',
      dataIndex: 'prefecture_name',
      key: 'prefecture_name',
      render: value => value || '-'
    },
    {
      title: '純参加者数',
      dataIndex: 'number_of_players_checkins',
      key: 'number_of_players_checkins',
      render: value => value || '-'
    },
    {
      title: '新規参加者数',
      dataIndex: 'new_participants',
      key: 'new_participants',
      render: value => value || '-'
    },
    {
      title: '総訪問数',
      dataIndex: 'total_visits',
      key: 'total_visits',
      render: value => value || '-'
    },
    {
      title: '制覇者数',
      dataIndex: 'number_of_finishers',
      key: 'number_of_finishers',
      render: value => value || '-'
    },
    {
      title: '平均制覇時間',
      dataIndex: 'average_finish_time',
      key: 'average_finish_time',
      render: value => value || '-'
    }
  ];

  const prefectureAllColumns = [
    {
      title: '都道府県',
      dataIndex: 'prefecture_name',
      key: 'prefecture_name',
      render: value => value || '-'
    },
    {
      title: '純参加者数',
      dataIndex: 'number_of_players_checkins',
      key: 'number_of_players_checkins',
      render: value => value || '-'
    },
    {
      title: '総訪問数',
      dataIndex: 'total_visits',
      key: 'total_visits',
      render: value => value || '-'
    },
    {
      title: '制覇者数',
      dataIndex: 'number_of_finishers',
      key: 'number_of_finishers',
      render: value => value || '-'
    },
    {
      title: '平均制覇時間',
      dataIndex: 'average_finish_time',
      key: 'average_finish_time',
      render: value => value || '-'
    }
  ];

  return (
    <>
      <Form.Item label="都道府県別" className="form-vertical">
        <Table
          columns={isAnalysisAll ? prefectureAllColumns : prefectureColumns}
          dataSource={data}
          size={'small'}
          pagination={false}
          rowKey="id"
          className="custom-table"
          loading={loading}
        />
      </Form.Item>
    </>
  );
};

export default PrefectureTable;

import React from 'react';
import { Form, Table } from 'antd';
import './styles.scss';

const DailyTable = ({ loading, data }) => {
  const dailyColumns = [
    {
      title: '日付',
      dataIndex: 'date',
      key: 'date',
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
    }
  ];

  return (
    <>
      <Form.Item label="日別" className="form-vertical">
        <Table
          columns={dailyColumns}
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

export default DailyTable;

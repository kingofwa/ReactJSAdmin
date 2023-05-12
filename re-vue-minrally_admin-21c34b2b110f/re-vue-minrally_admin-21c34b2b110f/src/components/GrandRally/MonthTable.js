import React from 'react';
import { Form, Table } from 'antd';
import './styles.scss';

const MonthTable = ({ data, loading, isBusiness }) => {
  const monthColumns = [
    {
      title: '年月',
      dataIndex: 'month',
      key: 'month',
      render: month => month || '-'
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
      render: new_participants => new_participants || '-'
    },
    {
      title: '総訪問数',
      dataIndex: 'total_visits',
      key: 'total_visits',
      render: total_visits => total_visits || '-'
    },
    {
      title: '制覇者数',
      dataIndex: 'number_of_finishers',
      key: 'number_of_finishers',
      render: number_of_finishers => number_of_finishers || '-'
    },
    {
      title: '平均制覇時間',
      dataIndex: 'average_finish_time',
      key: 'average_finish_time',
      render: average_finish_time => average_finish_time || '-'
    },
    {
      title: '売上想定額',
      dataIndex: 'estimated_sales_amount',
      key: 'estimated_sales_amount',
      render: estimated_sales_amount => estimated_sales_amount || '-'
    }
  ];

  if (isBusiness) {
    monthColumns.splice(3, 1, {
      title: '総チェックイン数',
      dataIndex: 'number_of_checked_in',
      key: 'number_of_checked_in',
      render: value => value || '-'
    });
  }

  return (
    <Form.Item label="月別" className="form-vertical">
      <Table
        columns={monthColumns}
        dataSource={data}
        size={'small'}
        pagination={false}
        rowKey="id"
        className="custom-table"
        loading={loading}
      />
    </Form.Item>
  );
};

export default MonthTable;

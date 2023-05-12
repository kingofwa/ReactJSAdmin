import React from 'react';
import { Form, Table } from 'antd';
import './styles.scss';

const SummaryTable = ({ data, loading, isDaily, isBusiness }) => {
  const baseColumns = [
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
    },
    {
      title: '売上想定額',
      dataIndex: 'estimated_sales_amount',
      key: 'estimated_sales_amount',
      render: value => value || '-'
    }
  ];

  const participantsColumn = [
    {
      title: '参加者数',
      dataIndex: 'number_of_participants',
      key: 'number_of_participants',
      render: value => value || '-'
    }
  ];

  const summaryDailyColumns = [
    ...participantsColumn,
    {
      title: '新規参加者数',
      dataIndex: 'new_participants',
      key: 'new_participants',
      render: value => value || '-'
    },
    ...baseColumns
  ];

  const summaryColumns = [...participantsColumn, ...baseColumns];

  if (isBusiness) {
    summaryColumns.splice(1, 1, {
      title: '総チェックイン数',
      dataIndex: 'number_of_checked_in',
      key: 'number_of_checked_in',
      render: value => value || '-'
    });

    summaryDailyColumns.splice(2, 1, {
      title: '総チェックイン数',
      dataIndex: 'number_of_checked_in',
      key: 'number_of_checked_in',
      render: value => value || '-'
    });
  }

  return (
    <>
      <Form.Item label="サマリー" className="form-vertical">
        <Table
          columns={isDaily ? summaryDailyColumns : summaryColumns}
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

export default SummaryTable;

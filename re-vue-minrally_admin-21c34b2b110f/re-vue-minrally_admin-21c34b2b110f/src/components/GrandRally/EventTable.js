import React from 'react';
import { Form, Table } from 'antd';
import './styles.scss';

const EventTable = ({ data, loading, isAnalysisAll, isBusiness }) => {
  const eventColumns = [
    {
      title: 'ラリー名',
      dataIndex: 'event_name',
      key: 'event_name',
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

  const eventAnalysisAllColumns = [
    {
      title: 'ラリー名',
      dataIndex: 'event_name',
      key: 'event_name',
      render: event_name => event_name || '-'
    },
    {
      title: '参加者数',
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

  if (isBusiness) {
    eventAnalysisAllColumns.splice(2, 1, {
      title: '総チェックイン数',
      dataIndex: 'number_of_checked_in',
      key: 'number_of_checked_in',
      render: value => value || '-'
    });

    eventColumns.splice(3, 1, {
      title: '総チェックイン数',
      dataIndex: 'number_of_checked_in',
      key: 'number_of_checked_in',
      render: value => value || '-'
    });
  }

  return (
    <>
      <Form.Item label="ラリー別" className="form-vertical">
        <Table
          columns={isAnalysisAll ? eventAnalysisAllColumns : eventColumns}
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

export default EventTable;

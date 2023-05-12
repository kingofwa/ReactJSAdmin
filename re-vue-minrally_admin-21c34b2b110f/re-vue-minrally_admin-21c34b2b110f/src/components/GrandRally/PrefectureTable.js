import React from 'react';
import { Form, Table } from 'antd';
import './styles.scss';

const PrefectureTable = ({ data, loading, isAnalysisAll, isBusiness }) => {
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

  const prefectureAnalysisAllColumns = [
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
    }
  ];

  if (isBusiness) {
    prefectureAnalysisAllColumns.splice(2, 1, {
      title: '総チェックイン数',
      dataIndex: 'number_of_checked_in',
      key: 'number_of_checked_in',
      render: value => value || '-'
    });

    prefectureColumns.splice(3, 1, {
      title: '総チェックイン数',
      dataIndex: 'number_of_checked_in',
      key: 'number_of_checked_in',
      render: value => value || '-'
    });
  }

  return (
    <>
      <Form.Item label="都道府県別" className="form-vertical">
        <Table
          columns={
            isAnalysisAll ? prefectureAnalysisAllColumns : prefectureColumns
          }
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

import React, { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import { getPlayerPlaying } from '@api/user';
import useQuery from '@utils/useQuery';
import Pager from '@components/Pager';
import './styles.scss';
import { size } from 'lodash';

const PlayerSeriesTable = () => {
  const query = useQuery();
  const id = query.get('id');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize
  });

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getPlayerPlaying(id, {
        page,
        per: pageSize,
        kind: 'grand'
      });
      setData(response?.data);
      setPagination({
        ...pagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const onPageChange = newPage => {
    fetchData(newPage);
  };

  const eventColumns = [
    {
      title: 'グランドラリー名',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.name || '-'}`
    },
    {
      title: 'ラリー数',
      dataIndex: 'number_of_games',
      key: 'number_of_games',
      render: (_, record) => `${record.number_of_games || '-'}`
    },
    {
      title: '制覇ラリー数',
      dataIndex: 'number_of_games_completed',
      key: 'number_of_games_completed',
      render: (_, record) => `${record.number_of_games_completed || '-'}`
    },
    {
      title: '最速制覇時間',
      dataIndex: 'fastest_finish_time_string',
      key: 'fastest_finish_time_string',
      render: fastest_finish_time_string =>
        fastest_finish_time_string ? `${fastest_finish_time_string}` : '-'
    },
    {
      title: '制覇速度ランキング',
      dataIndex: 'finisher_ranking',
      key: 'finisher_ranking',
      render: (_, record) => `${record.finisher_ranking || '-'}位`
    },
    {
      title: '制覇回数',
      dataIndex: 'number_of_times_completed',
      key: 'number_of_times_completed',
      render: (_, record) => `${record.number_of_times_completed || '-'}回`
    },
    {
      title: '制覇回数ランキング',
      dataIndex: 'number_of_finish_times_ranking',
      key: 'number_of_finish_times_ranking',
      render: (_, record) => `${record.number_of_finish_times_ranking || '-'}位`
    }
  ];

  return (
    <>
      <Table
        columns={eventColumns}
        dataSource={data}
        size={'small'}
        pagination={false}
        rowKey="id"
        className="custom-table table-no-background"
        loading={loading}
      />
      <div className="table__statistic">
        {pagination?.total}件中 {size(data)}件表示
      </div>
      <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
    </>
  );
};

export default PlayerSeriesTable;

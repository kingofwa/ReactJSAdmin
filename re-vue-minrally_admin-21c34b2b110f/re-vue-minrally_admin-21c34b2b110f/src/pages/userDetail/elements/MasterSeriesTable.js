import React, { useState, useEffect } from 'react';
import { message, Table } from 'antd';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import Pager from '@components/Pager';
import { getOwnedSeries } from '@api/user';
import useQuery from '@utils/useQuery';
import './styles.scss';
import { size } from 'lodash';

const MasterSeriesTable = () => {
  const query = useQuery();
  const id = query.get('id');
  const pageSize = 10;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize
  });

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getOwnedSeries(id, { page, per: pageSize });
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

  const onPageChange = newPage => {
    fetchData(newPage);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const seriesColumns = [
    {
      title: 'グランドラリー名',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.name || '-'}`
    },
    {
      title: 'スポット数',
      dataIndex: 'number_of_games',
      key: 'number_of_games',
      render: (_, record) => `${record.number_of_games || '-'}`
    },
    {
      title: '登録日',
      dataIndex: 'registration_date',
      key: 'registration_date',
      render: (_, record) => {
        const registrationDate = record?.registration_date;
        return registrationDate
          ? moment(registrationDate).format(DATE_DEFAULT)
          : '-';
      }
    },
    {
      title: 'ラリー開始日',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (_, record) => {
        const startDate = record?.start_date;
        return startDate ? moment(startDate).format(DATE_DEFAULT) : '-';
      }
    },
    {
      title: 'ラリー終了日',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (_, record) => {
        const endDate = record?.end_date;
        return endDate ? moment(endDate).format(DATE_DEFAULT) : '-';
      }
    }
  ];

  return (
    <>
      <Table
        columns={seriesColumns}
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

export default MasterSeriesTable;

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import { PATHS } from '@config/paths';
import { NUM_PER_PAGE } from '@config/constants';
import Pager from '@components/Pager';
import moment from 'moment-timezone';
import { DATE_DEFAULT } from '@utils/date';
import { size } from 'lodash';
import './styles.scss';

const BusinessPlayerTable = ({
  data,
  onPageChange,
  pagination,
  loading,
  pageSize = NUM_PER_PAGE
  // isBusiness
}) => {
  const history = useHistory();

  const columns = [
    {
      title: '参加者名',
      dataIndex: 'user_name',
      key: 'user_name',
      render: user_name => user_name || '-'
    },
    {
      title: 'メールアドレス',
      dataIndex: 'email',
      key: 'email',
      render: value => value || '-'
    },
    {
      title: '参加グランドラリー数',
      dataIndex: 'number_of_series',
      key: 'number_of_series',
      render: value => value || '-'
    },
    {
      title: '参加ラリー数',
      dataIndex: 'number_of_games',
      key: 'number_of_games',
      render: value => value || '-'
    },
    {
      title: '総チェックイン数',
      dataIndex: 'number_of_checked_in',
      key: 'number_of_checked_in',
      render: value => value || '-'
    },
    {
      title: '参加開始日',
      dataIndex: 'first_joined_at',
      key: 'first_joined_at',
      render: value =>
        value ? moment(value).tz('Asia/Tokyo').format(DATE_DEFAULT) : '-'
    },
    {
      title: 'メニュー',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: id => (
        <span
          onClick={() => {
            history.push(`${PATHS.business.playerDetail}?id=${id}`);
          }}
          className="cursor-pointer"
        >
          詳細確認
        </span>
      )
    }
  ];

  return (
    <div className="user-tab">
      <Table
        columns={columns}
        dataSource={data}
        size={'small'}
        rowKey="id"
        className="custom-table"
        pagination={pagination}
        loading={loading}
      />
      <div className="table__statistic">
        {pagination?.total}件中 {size(data)}件表示
      </div>
      <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
    </div>
  );
};

export default BusinessPlayerTable;

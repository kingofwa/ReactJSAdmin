import React from 'react';
import { Table, Tooltip } from 'antd';
import { size } from 'lodash';
import './styles.scss';

const RankingTable = ({ title, data, isHashtag, loading }) => {
  const columns = [
    {
      render: (_text, _record, index) => index + 1
    },
    {
      title: isHashtag ? 'ハッシュタグ名' : 'ユーザー名',
      dataIndex: isHashtag ? 'name' : 'user_name',
      key: isHashtag ? 'name' : 'user_name',
      render: name => (
        <Tooltip placement="top" title={name}>
          {size(name) > 10 ? `${name.substring(0, 10)}...` : name}
        </Tooltip>
      )
    },
    {
      title: '総合',
      dataIndex: 'total_count',
      key: isHashtag ? 'total_count' : 'number_of_comprehensive',
      sorter: (a, b) =>
        isHashtag
          ? a.total_count - b.total_count
          : a.total_count - b.total_count,
      render: count => count || '-'
    },
    {
      title: isHashtag ? '検索回数' : 'アクセス数',
      dataIndex: isHashtag ? 'searching_count' : 'visit_count',
      key: isHashtag ? 'searching_count' : 'visit_count',
      sorter: (a, b) =>
        isHashtag
          ? a.searching_count - b.searching_count
          : a.visit_count - b.visit_count,
      render: count => count || '-'
    },
    {
      title: isHashtag ? '利用ラリー数' : 'フォロワー数',
      dataIndex: isHashtag ? 'taggings_count' : 'follower_count',
      key: isHashtag ? 'taggings_count' : 'follower_count',
      sorter: (a, b) =>
        isHashtag
          ? a.taggings_count - b.taggings_count
          : a.follower_count - b.follower_count,
      render: count => count || '-'
    }
  ];

  return (
    <div className="ranking-table">
      <div className="ranking-table-header">{title}</div>
      <div className="ranking-table-body">
        <Table
          columns={columns}
          dataSource={data}
          size={'small'}
          rowKey="id"
          className="custom-table"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default RankingTable;

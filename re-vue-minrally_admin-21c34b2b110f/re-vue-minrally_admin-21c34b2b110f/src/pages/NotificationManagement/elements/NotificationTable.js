import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Dropdown, Space, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { PATHS } from '@config/paths';
import { NUM_PER_PAGE } from '@config/constants';
import Pager from '@components/Pager';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import ConfirmDelete from '@components/Modals/ConfirmDelete';
import './styles.scss';
import { size } from 'lodash';

const NotificationTable = ({
  data,
  onPageChange,
  pagination,
  onDeleteNotification
}) => {
  const history = useHistory();
  const pageSize = NUM_PER_PAGE;
  const [delId, setDelId] = useState();
  const [showModal, setShowModal] = useState(false);

  const renderStatus = status => {
    switch (status) {
      case 'active':
        return '公開中';
      case 'deactive':
        return '非公開';
      default:
        return '-';
    }
  };

  const renderKind = kind => {
    switch (kind) {
      case 'system':
        return 'システム';
      case 'campaign':
        return 'キャンペーン';
      case 'other':
        return 'その他';
      default:
        return '-';
    }
  };

  const columns = [
    {
      title: 'ラベル',
      dataIndex: 'kind',
      key: 'kind',
      render: kind => renderKind(kind)
    },
    {
      title: 'タイトル',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: status => renderStatus(status)
    },
    {
      title: '登録日',
      dataIndex: 'registration_date',
      key: 'registration_date',
      render: (_, record) => moment(record.created_at).format(DATE_DEFAULT)
    },
    {
      title: 'メニュー',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle" className="cursor-pointer">
          <Dropdown overlay={menu(record)}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      )
    }
  ];

  const onMenuClick = (item, action) => {
    switch (action) {
      case 'detail':
        history.push(`${PATHS.notificationDetail}?id=${item?.id}`);
        break;
      case 'delete':
        setDelId(item?.id);
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  const menu = item => (
    <Menu
      items={[
        {
          key: '1',
          label: <div onClick={() => onMenuClick(item, 'detail')}>詳細確認</div>
        },
        {
          key: '2',
          label: <div onClick={() => onMenuClick(item, 'delete')}>削除</div>
        }
      ]}
    />
  );

  return (
    <div className="master-tab">
      <Table
        columns={columns}
        dataSource={data}
        size={'small'}
        rowKey="id"
        className="custom-table"
        pagination={{ pageSize: pageSize }}
      />
      <div className="table__statistic">
        {pagination?.total}件中 {size(data)}件表示
      </div>
      <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
      <ConfirmDelete
        visible={showModal}
        onVisible={() => setShowModal(false)}
        onSuccess={() => onDeleteNotification(delId)}
        title="お知らせを削除します。"
      />
    </div>
  );
};

export default NotificationTable;

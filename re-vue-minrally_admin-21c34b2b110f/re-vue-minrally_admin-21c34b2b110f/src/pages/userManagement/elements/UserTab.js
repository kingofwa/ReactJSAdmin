import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Dropdown, Space, Menu, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { PATHS } from '@config/paths';
import { NUM_PER_PAGE } from '@config/constants';
import Pager from '@components/Pager';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import { deleteUser } from '@api/user';
import ConfirmDelete from '@components/Modals/ConfirmDelete';
import { size } from 'lodash';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import './styles.scss';

const UserTab = ({
  data,
  onPageChange,
  pagination,
  loading,
  delUserSuccess
}) => {
  const history = useHistory();
  const pageSize = NUM_PER_PAGE;
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState();

  const columns = [
    {
      title: 'ユーザー名',
      dataIndex: 'user_name',
      key: 'user_name',
      render: user_name => user_name || '-'
    },
    {
      title: 'マスター登録',
      render: (_, record) => (record.is_creator ? 'あり' : 'なし')
    },
    {
      title: 'メールアドレス',
      dataIndex: 'email',
      key: 'email',
      render: email => email || '-'
    },
    {
      title: '登録日',
      dataIndex: 'created_at',
      key: 'created_at',
      render: created_at =>
        created_at ? moment(created_at).format(DATE_DEFAULT) : '-'
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
      case 'edit':
        history.push(`${PATHS.userDetail}?id=${item?.id}`);
        break;
      case 'delete':
        setDelId(item?.id);
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  const onDelUser = async id => {
    try {
      await deleteUser(id);
      delUserSuccess();
      pushMessage(MESSAGES.deleteSuccess);
    } catch (error) {
      message.error(error);
    }
  };

  const menu = item => (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div onClick={() => onMenuClick(item, 'edit')}>詳細確認・編集</div>
          )
        },
        {
          key: '2',
          label: <div onClick={() => onMenuClick(item, 'delete')}>削除</div>
        }
      ]}
    />
  );

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
      <ConfirmDelete
        visible={showModal}
        onVisible={() => setShowModal(false)}
        onSuccess={() => onDelUser(delId)}
        title="このユーザーを削除します。"
      />
    </div>
  );
};

export default UserTab;

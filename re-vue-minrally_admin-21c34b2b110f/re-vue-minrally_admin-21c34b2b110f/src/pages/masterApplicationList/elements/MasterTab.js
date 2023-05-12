import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Dropdown, Space, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { PATHS } from '@config/paths';
import { NUM_PER_PAGE } from '@config/constants';
import Pager from '@components/Pager';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import UnapprovedModal from '@components/Modals/UnapprovedModal';
import ApprovedModal from '@components/Modals/ApprovedModal';
import { size } from 'lodash';
import './styles.scss';

const MasterTab = ({ data, onPageChange, pagination, fetchCreator }) => {
  const history = useHistory();
  const pageSize = NUM_PER_PAGE;
  const [selectId, setSelectId] = useState(null);
  const [showModalUnapproved, setShowModalUnapproved] = useState(false);
  const [showModalApproved, setShowModalApproved] = useState(false);

  // const renderStatus = status => {
  //   switch (status) {
  //     case 'approved':
  //       return '承認された';
  //     case 'rejected':
  //       return '却下された';
  //     case 'submitted':
  //       return '承認待ち';
  //     default:
  //       return '-';
  //   }
  // };

  const columns = [
    {
      title: 'ユーザー名',
      dataIndex: 'user_name',
      key: 'user_name',
      render: user_name => user_name || '-'
    },
    {
      title: 'メールアドレス',
      dataIndex: 'email',
      key: 'email',
      render: email => email || '-'
    },
    {
      title: '登録日',
      dataIndex: 'registration_date',
      key: 'registration_date',
      render: registration_date =>
        registration_date ? moment(registration_date).format(DATE_DEFAULT) : '-'
    },
    {
      title: '申請日',
      dataIndex: 'application_date',
      key: 'application_date',
      render: application_date =>
        application_date ? moment(application_date).format(DATE_DEFAULT) : '-'
    },
    // {
    //   title: 'ステータス',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: status => renderStatus(status)
    // },
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
      case 'confirm':
        history.push(`${PATHS.masterApplicationDetail}?id=${item?.id}`);
        break;
      case 'admit':
        setSelectId(item?.id);
        setShowModalApproved(true);
        break;
      case 'rejected':
        setSelectId(item?.id);
        setShowModalUnapproved(true);
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
          label: (
            <div onClick={() => onMenuClick(item, 'confirm')}>申請内容確認</div>
          )
        },
        {
          key: '2',
          label: <div onClick={() => onMenuClick(item, 'admit')}>承認</div>
        },
        {
          key: '3',
          label: <div onClick={() => onMenuClick(item, 'rejected')}>却下</div>
        }
      ]}
    />
  );

  return (
    <div className="master-tab">
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        rowKey="id"
        className="custom-table"
        pagination={false}
      />
      <div className="table__statistic">
        {pagination?.total}件中 {size(data)}件表示
      </div>
      <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
      <UnapprovedModal
        visible={showModalUnapproved}
        onVisible={() => {
          setShowModalUnapproved(false);
        }}
        onSuccess={fetchCreator}
        id={selectId}
      />
      <ApprovedModal
        visible={showModalApproved}
        onVisible={() => {
          setShowModalApproved(false);
        }}
        onSuccess={fetchCreator}
        id={selectId}
      />
    </div>
  );
};

export default MasterTab;

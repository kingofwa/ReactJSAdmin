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
import { size } from 'lodash';
import './styles.scss';

const BusinessTab = ({
  data,
  onPageChange,
  pagination,
  loading,
  onDeleteBusiness
}) => {
  const history = useHistory();
  const pageSize = NUM_PER_PAGE;
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState();
  const columns = [
    {
      title: '事業者名',
      dataIndex: 'business_name',
      key: 'business_name'
    },
    {
      title: '部署名',
      dataIndex: 'department_name',
      key: 'department_name',
      render: department_name => department_name || '-'
    },
    {
      title: '担当者名',
      dataIndex: 'person_in_charge_name',
      key: 'person_in_charge_name',
      render: person_in_charge_name => person_in_charge_name || '-'
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
      render: (_, record) =>
        moment(record.registration_date).format(DATE_DEFAULT)
    },
    {
      title: 'メニュー',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle" className="cursor-pointer">
          <Dropdown
            overlay={
              record.special_case === 'do_not_remove'
                ? menuWithoutDelete(record)
                : menu(record)
            }
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      )
    }
  ];

  const onMenuClick = (item, action) => {
    switch (action) {
      case 'edit':
        history.push(`${PATHS.businessDetail}?id=${item?.id}`);
        break;
      case 'delete':
        if (item?.special_case !== 'hidden') {
          setDelId(item?.id);
          setShowModal(true);
        }
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
            <div className="tab-menu" onClick={() => onMenuClick(item, 'edit')}>
              詳細確認・編集
            </div>
          )
        },
        {
          key: '2',
          label: (
            <div
              className="tab-menu"
              onClick={() => onMenuClick(item, 'delete')}
            >
              削除
            </div>
          )
        }
      ]}
    />
  );

  const menuWithoutDelete = item => (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div className="tab-menu" onClick={() => onMenuClick(item, 'edit')}>
              詳細確認・編集
            </div>
          )
        }
      ]}
    />
  );
  return (
    <div className="business-tab">
      <Table
        columns={columns}
        dataSource={data}
        size={'small'}
        rowKey="id"
        className="custom-table"
        pagination={false}
        loading={loading}
      />
      <div className="table__statistic">
        {pagination?.total}件中 {size(data)} 件表示
      </div>
      <ConfirmDelete
        visible={showModal}
        onVisible={() => setShowModal(false)}
        onSuccess={() => onDeleteBusiness(delId)}
        title="この事業者をを削除します。"
      />
      <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
    </div>
  );
};

export default BusinessTab;

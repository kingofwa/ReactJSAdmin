import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Dropdown, Space, Menu, InputNumber, Form } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { PATHS } from '@config/paths';
import { NUM_PER_PAGE } from '@config/constants';
import Pager from '@components/Pager';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import ConfirmDelete from '@components/Modals/ConfirmDelete';
import HiddenInput from '@components/form/HiddenInput';
import './styles.scss';
import { size } from 'lodash';

const BannerTab = ({
  loading,
  data,
  onPageChange,
  pagination,
  onDeleteBanner
}) => {
  const history = useHistory();
  const pageSize = NUM_PER_PAGE;
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState();

  const renderStatus = status => {
    switch (status) {
      case 'active':
        return '公開';
      case 'deactive':
        return '非公開';
      default:
        return '-';
    }
  };

  const columns = [
    {
      title: 'バナー名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'リンク先URL',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: '掲載順',
      dataIndex: 'order_number',
      key: 'order_number',
      render: (order_number, item, index) => {
        return (
          <>
            <Form.Item
              name={['orders', index, 'order_number']}
              initialValue={order_number}
            >
              <InputNumber min={1} className="order-input" />
            </Form.Item>
            <HiddenInput
              name={['orders', index, 'id']}
              initialValue={item?.id}
            />
          </>
        );
      }
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: status => renderStatus(status)
    },
    {
      title: '登録日',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) =>
        record.created_at ? moment(record.created_at).format(DATE_DEFAULT) : '-'
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
        history.push(`${PATHS.bannerDetail}?id=${item?.id}`);
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
          label: (
            <div className="tab-menu" onClick={() => onMenuClick(item, 'edit')}>
              内容確認・編集
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

  return (
    <div className="banner-tab">
      <Table
        columns={columns}
        dataSource={data}
        size={'small'}
        rowKey="id"
        className="custom-table"
        loading={loading}
      />
      <div className="table__statistic">
        {pagination?.total}件中 {size(data)} 件表示
      </div>
      <ConfirmDelete
        visible={showModal}
        onVisible={() => setShowModal(false)}
        onSuccess={() => onDeleteBanner(delId)}
        title="このバナーを削除します。"
      />
      <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
    </div>
  );
};

export default BannerTab;

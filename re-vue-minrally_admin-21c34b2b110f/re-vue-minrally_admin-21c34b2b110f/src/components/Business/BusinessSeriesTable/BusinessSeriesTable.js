import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MoreOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Space, Table } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import { PATHS } from '@config/paths';
import moment from 'moment-timezone';
import { DATE_DEFAULT } from '@utils/date';
import Pager from '@components/Pager';
import ConfirmDelete from '@components/Modals/ConfirmDelete';
import './styles.scss';

const BusinessSeriesTable = ({
  data,
  onPageChange,
  pagination,
  loading,
  onDelSeries,
  businessId,
  isBusiness,
  pageSize = 5
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState();
  moment.tz.setDefault('Asia/Tokyo');

  const columns = [
    {
      title: 'グランドラリー名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: isBusiness ? '登録ラリー数' : 'ラリー数',
      dataIndex: 'number_of_games',
      key: 'number_of_games',
      render: value => value || '-'
    },
    {
      title: '総スポット数',
      dataIndex: 'number_of_spots',
      key: 'number_of_spots',
      render: value => value || '-'
    },
    {
      title: '登録日',
      dataIndex: 'created_at',
      key: 'created_at',
      render: created_at =>
        created_at ? moment(created_at).format(DATE_DEFAULT) : '-'
    },
    {
      title: '開始日',
      dataIndex: 'start_date',
      key: 'start_date',
      render: start_date =>
        start_date ? moment(start_date).format(DATE_DEFAULT) : '-'
    },
    {
      title: '終了日',
      dataIndex: 'end_date',
      key: 'end_date',
      render: end_date =>
        end_date ? moment(end_date).format(DATE_DEFAULT) : '-'
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
        const url = isBusiness
          ? PATHS.business.grandRallyDetail
          : PATHS.seriesDetail;
        history.push(`${url}?id=${item?.id}`);
        break;
      case 'delete':
        setDelId(item?.id);
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  const onCreateSeries = () => {
    if (isBusiness) {
      history.push(PATHS.business.newGranRally);
    } else {
      history.push(`${PATHS.seriesNew}?id=${businessId}`);
    }
  };

  const menu = item => {
    if (item?.number_of_games === 0 && item?.number_of_players === 0) {
      return (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <div
                  className="tab-menu"
                  onClick={() => onMenuClick(item, 'edit')}
                >
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
                  グランドラリーを削除
                </div>
              )
            }
          ]}
        />
      );
    }
    return (
      <Menu
        items={[
          {
            key: '1',
            label: (
              <div
                className="tab-menu"
                onClick={() => onMenuClick(item, 'edit')}
              >
                詳細確認・編集
              </div>
            )
          }
        ]}
      />
    );
  };

  return (
    <>
      <div className="business-series-table">
        <div
          className={
            isBusiness
              ? 'business-series-table__title'
              : 'business-series-table__title mt-30'
          }
        >
          グランドラリー管理
        </div>
        <div className="business-series-table__body">
          <div className="business-series-table__row">
            <Col span={16}>
              <Table
                columns={columns}
                dataSource={data}
                size={'small'}
                pagination={false}
                rowKey="id"
                className="custom-table table-no-background"
                loading={loading}
              />
            </Col>
            <CustomButton
              className="btn-outLine-second"
              onClick={onCreateSeries}
            >
              グランドラリー登録
            </CustomButton>
          </div>
          <ConfirmDelete
            visible={showModal}
            onVisible={() => setShowModal(false)}
            onSuccess={() => onDelSeries(delId)}
            title="このグランドラリーを削除します。"
          />
          <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
        </div>
      </div>
    </>
  );
};

export default BusinessSeriesTable;

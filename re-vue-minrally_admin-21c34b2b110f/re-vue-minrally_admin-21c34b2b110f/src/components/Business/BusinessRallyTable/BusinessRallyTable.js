import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Space, Table } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import { PATHS } from '@config/paths';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import { DATE_DEFAULT } from '@utils/date';
import Pager from '@components/Pager';
import ConfirmDelete from '@components/Modals/ConfirmDelete';
import { getRallyStatus } from '@utils/helper';
import { STATUS_ENUM } from '@config/constants';
import './styles.scss';

const BusinessRallyTable = ({
  data,
  onPageChange,
  pagination,
  loading,
  onDelGame,
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
      title: 'ラリー名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'スポット数',
      dataIndex: 'number_of_spots',
      key: 'number_of_spots',
      render: number_of_spots => number_of_spots || '-'
    },
    {
      title: 'グランドラリー名',
      dataIndex: 'serie_name',
      key: 'serie_name',
      render: serie_name => serie_name || '-'
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: status => getRallyStatus(status)
    },
    {
      title: '登録日',
      dataIndex: 'created_at',
      key: 'created_at',
      render: created_at =>
        created_at ? moment(created_at).format(DATE_DEFAULT) : '-'
    },
    {
      title: 'ラリー開始日',
      dataIndex: 'start_date',
      key: 'start_date',
      render: start_date =>
        start_date ? moment(start_date).format(DATE_DEFAULT) : '-'
    },
    {
      title: 'ラリー終了日',
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
        const url = isBusiness ? PATHS.business.rallyDetail : PATHS.eventDetail;
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

  const onGoEventRegistration = () => {
    let url = '';
    if (isBusiness) {
      url = PATHS.business.newRally;
    } else {
      url = `${PATHS.eventRegistration}?id=${businessId}`;
    }
    history.push(url);
  };

  const menu = item => {
    if (item?.status === STATUS_ENUM.DRAFT) {
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
                  ラリーを削除
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
      <div className="business-info">
        <div className="business-info-title mt-30">ラリー管理</div>
        <div className="business-info-body">
          <div className="business-info-row">
            <Col span={18}>
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
              onClick={onGoEventRegistration}
            >
              ラリー登録
            </CustomButton>
          </div>
          <ConfirmDelete
            visible={showModal}
            onVisible={() => setShowModal(false)}
            onSuccess={() => onDelGame(delId)}
            title="このラリーを削除します。"
          />
          <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
        </div>
      </div>
    </>
  );
};

export default BusinessRallyTable;

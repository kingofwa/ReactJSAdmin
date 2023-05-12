import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Space, Table } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import Pager from '@components/Pager';
import moment from 'moment';
import { PATHS } from '@config/paths';
import { useHistory } from 'react-router-dom';
import { DATE_DEFAULT } from '@utils/date';
import ConfirmDelete from '@components/Modals/ConfirmDelete';
import RallySelectModal from '@components/Modals/RallySelectModal';
import { getRallyStatus } from '@utils/helper';
import './styles.scss';

const pageSize = 5;

const EventManagementTable = ({
  pagination,
  data,
  onPageChange,
  loading,
  onDelGame,
  businessId,
  handleUpdateRallyList = () => {},
  onChangeRallyList = () => {},
  isBusiness
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState();
  const [showModalRally, setShowModalRally] = useState(false);

  const columns = [
    {
      title: 'ラリー名',
      dataIndex: 'name',
      key: 'name',
      render: name => name || '-'
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
      title: '登録日',
      dataIndex: 'registration_date',
      key: 'registration_date',
      render: registration_date =>
        registration_date ? moment(registration_date).format(DATE_DEFAULT) : '-'
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

  if (isBusiness) {
    columns.splice(3, 0, {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: value => getRallyStatus(value) || '-'
    });
  }

  const onMenuClick = (item, action) => {
    switch (action) {
      case 'edit':
        if (isBusiness) {
          history.push(`${PATHS.business.rallyDetail}?id=${item?.id}`);
        } else {
          history.push(`${PATHS.eventDetail}?id=${item?.id}`);
        }
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
              詳細確認・編集
            </div>
          )
        }
      ]}
    />
  );

  return (
    <>
      <div className="series-detail">
        <div className="series-detail-title mt-30">ラリー管理</div>
        <div className="series-detail-body">
          <div className="series-detail-row">
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
              onClick={() => {
                setShowModalRally(true);
              }}
            >
              既存ラリーを追加
            </CustomButton>
          </div>
          <ConfirmDelete
            visible={showModal}
            onVisible={() => setShowModal(false)}
            onSuccess={() => onDelGame(delId)}
            title="このラリーをを削除します。"
          />
          <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
        </div>
        <RallySelectModal
          visible={showModalRally}
          onVisible={() => {
            setShowModalRally(false);
          }}
          businessId={businessId}
          handleUpdateRallyList={handleUpdateRallyList}
          onChangeRallyList={onChangeRallyList}
          isBusiness={isBusiness}
        />
      </div>
    </>
  );
};

export default EventManagementTable;

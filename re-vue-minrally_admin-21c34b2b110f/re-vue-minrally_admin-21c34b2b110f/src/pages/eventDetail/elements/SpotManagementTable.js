import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, message, Space, Table } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import { PATHS } from '@config/paths';
import { useHistory } from 'react-router-dom';
import { filter, size } from 'lodash';
import ConfirmDelete from '@components/Modals/ConfirmDelete';
import { deleteSpot, updateSpotOrder } from '@api/event';
import { SPOT_STATUS, QrCodeEnum } from '@config/constants';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import logo from '@assets/icons/logo-minrally.png';
import { QRCode } from 'react-qrcode-logo';
import ReactDragListView from 'react-drag-listview';

import './styles.scss';

const SpotManagementTable = ({
  spotsData,
  rallyId,
  setSpotsData = () => {},
  hasPlayer,
  isPublished
}) => {
  const history = useHistory();
  const [delId, setDelId] = useState();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const getStatus = status => {
    switch (status) {
      case SPOT_STATUS.registrations:
        return '登録済';
      case SPOT_STATUS.unregistered:
        return '未登録';
      case SPOT_STATUS.draft:
        return '下書き';
      default:
        return '';
    }
  };

  const downloadQRCode = (id, name, isQrCode) => {
    if (isQrCode) {
      const canvas = document.getElementById(`qr-code-${id}`);
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${name}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const renderQrCode = id => {
    const link = `${process.env.REACT_APP_USER_SITE_URL}${PATHS.rallyMyPageSpotDetail}/${id}`;
    return (
      <div className="qr-code-canvas">
        <QRCode
          id={`qr-code-${id}`}
          value={link}
          size={150}
          logoImage={logo}
          logo
        />
      </div>
    );
  };

  const columns = [
    {
      title: 'スポット名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'QRコード',
      key: 'qr_code_link',
      render: (_, record) => {
        const isQrCode = record?.allow_type_of_checkin === QrCodeEnum.QR_CODE;
        return (
          <>
            <span
              onClick={() => downloadQRCode(record?.id, record?.name, isQrCode)}
              className={isQrCode && 'event-detail-download-qr'}
            >
              {isQrCode ? 'ダウンロード' : 'なし'}
            </span>
            {renderQrCode(record?.id)}
          </>
        );
      }
    },
    {
      title: 'GPS設定',
      dataIndex: 'id',
      render: (_, record) => <span>あり</span>
    },
    {
      title: '登録日',
      dataIndex: 'registration_date',
      key: 'registration_date',
      render: (_, record) =>
        moment(record.registration_date).format(DATE_DEFAULT)
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => getStatus(record.status)
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
        const url = history.location?.pathname + history.location?.search;
        history.push(
          `${PATHS.eventRegistrationSpotSetting}?rallyId=${rallyId}&id=${item?.id}&redirectTo=${url}`
        );
        break;
      case 'delete':
        console.log('item del: ', item);
        break;
      default:
        break;
    }
  };

  const onDelSpot = spotId => {
    setDelId(spotId);
    setShowModalDelete(true);
  };

  const onDeleteSpot = async spotId => {
    try {
      await deleteSpot(rallyId, spotId);
      const newSpots = filter(spotsData, spot => spot?.id !== spotId);
      setSpotsData(newSpots);
      pushMessage(MESSAGES.deleteSuccess);
    } catch (error) {
      message.error(error);
    }
  };

  const onCreateSpot = () => {
    const asPath = history.location?.pathname;
    const search = history.location?.search;
    const url = asPath + search;
    history.push(
      `${PATHS.eventRegistrationSpotSetting}?rallyId=${rallyId}&redirectTo=${url}`
    );
  };

  const onUpdateSpotOrder = async data => {
    const orderArr = data.map((item, index) => {
      return { ...item, order_number: index + 1 };
    });
    const params = { spots: orderArr };

    await updateSpotOrder(rallyId, params);
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const data = [...spotsData];
      const temp = data[fromIndex];
      data[fromIndex] = data[toIndex];
      data[toIndex] = temp;
      setSpotsData(data);
      onUpdateSpotOrder(data);
    },
    nodeSelector: '.ant-table-row'
  };

  const menu = item => {
    if (hasPlayer || (isPublished && size(spotsData) <= 3)) {
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
          },
          {
            key: '2',
            label: (
              <div className="tab-menu" onClick={() => onDelSpot(item?.id)}>
                削除
              </div>
            )
          }
        ]}
      />
    );
  };

  return (
    <>
      <div className="event-detail">
        <div className="event-detail-title mt-30">スポット管理</div>
        <div className="event-detail-body">
          <div className="event-detail-row">
            <Col span={18}>
              <ReactDragListView {...dragProps}>
                <Table
                  columns={columns}
                  dataSource={spotsData}
                  size={'small'}
                  pagination={false}
                  rowKey="id"
                  className="custom-table table-no-background"
                />
              </ReactDragListView>
            </Col>
            {/* <CustomButton className="btn-outLine-second">
              バージョンアップデート
            </CustomButton> */}
          </div>
          {size(spotsData) < 7 && (
            <div className="event-detail-actions">
              <CustomButton
                type="primary"
                onClick={onCreateSpot}
                disabled={hasPlayer}
              >
                スポット追加
              </CustomButton>
            </div>
          )}
        </div>
        <ConfirmDelete
          visible={showModalDelete}
          onVisible={() => setShowModalDelete(false)}
          onSuccess={() => onDeleteSpot(delId)}
          title="このスポットを削除します。"
        />
      </div>
    </>
  );
};

export default SpotManagementTable;

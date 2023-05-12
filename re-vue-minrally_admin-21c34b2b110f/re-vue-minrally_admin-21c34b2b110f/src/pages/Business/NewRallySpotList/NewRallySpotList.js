import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import { PATHS } from '@config/paths';
import CustomButton from '@components/buttons/custom-button';
import useQuery from '@utils/useQuery';
import { message, Spin } from 'antd';
import { getRallySpot, deleteSpot } from '@api/event';
import { every, map, size } from 'lodash';
import SpotErrorMessageModal from '@components/Event/SpotErrorMessageModal';
import { SPOT_STATUS } from '@config/constants';
import ConfirmDelete from '@components/Modals/ConfirmDelete';
import icDelete from '@assets/icons/ic-delete.png';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import './styles.scss';

const NewRallySpotList = ({ location }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();
  const rallyId = query.get('id');
  const [spots, setSpots] = useState([]);
  const [showErrModal, setShowErrModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [delId, setDelId] = useState();
  const [eventInfo, setEventInfo] = useState();

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.business.rallyManagement,
          breadcrumbName: 'ラリー管理'
        }
      },
      {
        route: {
          path: `${PATHS.business.rallyDetail}?id=${eventInfo?.game?.id}`,
          breadcrumbName: eventInfo?.game?.name
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'スポット情報'
        }
      }
    ];
  };

  const getSpots = async () => {
    try {
      setIsLoading(true);
      const response = await getRallySpot(rallyId);
      setSpots(response?.data);
      setEventInfo(response?.extra);
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (rallyId) {
      getSpots();
    }
    // eslint-disable-next-line
  }, [rallyId]);

  const onNextStep = () => {
    const isAllSpotRegistered = every(spots, ['status', 'registered']);
    if (size(spots) > 2 && isAllSpotRegistered) {
      const url = `${PATHS.business.newRallySystemSetting}?rallyId=${rallyId}`;
      history.push(url);
    } else {
      setShowErrModal(true);
    }
  };

  const onCreateSpot = () => {
    history.push(`${PATHS.business.editSpot}?rallyId=${rallyId}`);
  };

  const onDelSpot = spotId => {
    setDelId(spotId);
    setShowModalDelete(true);
  };

  const onDeleteSpot = async spotId => {
    try {
      await deleteSpot(rallyId, spotId);
      getSpots();
      pushMessage(MESSAGES.deleteSuccess);
    } catch (error) {
      message.error(error);
    }
  };

  const onSaveDraft = () => {
    pushMessage(MESSAGES.saveDraft);
    const url = `${PATHS.business.rallyManagement}`;
    history.push(url);
  };

  const renderSpotItem = spot => {
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

    return (
      <div className="spot-item" key={spot?.id}>
        <p className="spot-item-title">{spot?.name}</p>
        <p className="spot-item-status">{getStatus(spot?.status)}</p>
        <CustomButton
          className="spot-item-action"
          onClick={() => {
            history.push(
              `${PATHS.business.editSpot}?rallyId=${rallyId}&id=${spot?.id}`
            );
          }}
        >
          編集
        </CustomButton>
        <div onClick={() => onDelSpot(spot?.id)} className="delete-spot">
          <img src={icDelete} alt="icons" />
        </div>
      </div>
    );
  };

  return (
    <Spin spinning={isLoading} className="custom-spinner">
      <HeaderTitle title="ラリー登録" />
      <div className="main-container spot-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="spot-detail">
          <div className="spot-detail-title">スポット情報</div>
          <div className="spot-detail-body">
            <div className="spot-detail-des">
              ※3ヶ所から7ヶ所まで登録可能です。
              <br />
              ※ラリー開始後のスポット数の変更はできません。
            </div>
            <div className="spot-detail-list">
              {map(spots, spot => renderSpotItem(spot))}
            </div>
            {size(spots) < 7 && (
              <CustomButton className="btn-action" onClick={onCreateSpot}>
                スポットを追加
              </CustomButton>
            )}
            <div className="spot-detail-note">
              スポットは最低3箇所の登録が必要です。下書き状態のスポットがあると公開できません。
            </div>
            <div className="spot-detail-actions">
              <CustomButton className="btn-action" onClick={onSaveDraft}>
                下書き保存
              </CustomButton>
              <CustomButton className="btn-action" onClick={onNextStep}>
                システム設定へ
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <SpotErrorMessageModal
        isShow={showErrModal}
        onHide={() => setShowErrModal(false)}
      />
      <ConfirmDelete
        visible={showModalDelete}
        onVisible={() => setShowModalDelete(false)}
        onSuccess={() => onDeleteSpot(delId)}
        title="このスポットを削除します。"
      />
    </Spin>
  );
};

export default NewRallySpotList;

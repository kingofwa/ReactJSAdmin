/* eslint-disable import/no-unresolved */
import { CustomButton } from "@components/common/buttons";
import HeaderBack from "@components/common/header/HeaderBack";
import { LoaderContext } from "@contexts/loader";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PATHS from "@config/paths";
import RallyTitle from "@components/RallyCreate/RallyTitle";
import RallySteps from "@components/RallyCreate/RallySteps";
import {
  deleteSpot,
  GetSpots,
  UpdateSpotOrder
} from "@components/RallyCreate/service";
import { every, size } from "lodash";
import ConfirmDelete from "@components/common/modal/ConfirmDelete";
// import useSwitchRallyVersion from "hooks/useSwitchRallyVersion";
import { RALLY_STATUS } from "@config/constants";
// import RallyVersionModal from "@components/common/modal/RallyVersionModal";
import { MESSAGES } from "@config/messages";
import { message } from "antd";
import { MESSAGE_DURATION } from "@utils/constants";
import ReactDragListView from "react-drag-listview";
import SpotItem from "./SpotItem";
// import DeleteSpotMessageModal from "./elements/DeleteSpotMessageModal";
import styles from "./styles.module.scss";
// import SpotMessageModal from "./elements/SpotMessageModal";
// import SpotErrorModal from "./elements/SpotErrorModal";
import ErrorPublicMessageModal from "./elements/ErrorPublicMessageModal";
import DeleteSpotMessageModal from "./elements/DeleteSpotMessageModal";
// import SpotErrorModal from "./elements/SpotErrorModal";
import SpotMessageModal from "./elements/SpotMessageModal";

const CreateRallySpotListContainer = ({ isEdit = false }) => {
  const [spots, setSpots] = useState([]);
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const router = useRouter();
  const rallyId = router?.query?.id;
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  // const [showMessage, setShowMessage] = useState(false);
  // const { renderSwitchRallyVersion } = useSwitchRallyVersion();
  const [isInValidList, setIsInValidList] = useState(false);
  const [dataExtra, setDataExtra] = useState({});

  const [showErrMessage, setShowErrMessage] = useState(false);
  // const [showVersionModal, setShowVersionModal] = useState(false);
  const [showCanEditModal, setShowCanEditModal] = useState(false);
  const hasPlayer = !!dataExtra?.game?.number_of_players;
  const isPublished = dataExtra?.game?.status === RALLY_STATUS.PUBLISHED;
  const isDraft = dataExtra?.game?.status === RALLY_STATUS.DRAFT;
  const [showErrPublicRally, setShowErrPublicRally] = useState(false);

  const onShowModalConfirmDel = id => {
    if (hasPlayer) {
      setShowErrPublicRally(true);
    } else if (isPublished && size(spots) <= 3) {
      setShowErrMessage(true);
    } else {
      setDeleteId(id);
      setShowModal(true);
    }

    // if (size(spots) <= 3 && isPublished) {
    //   setShowErrPublicRally(true);
    // } else if (!hasPlayer) {
    //   setDeleteId(id);
    //   setShowModal(true);
    // } else {
    //   setShowCanEditModal(true);
    // }
  };

  const fetchSpots = async () => {
    try {
      showLoadingAnim();
      const response = await GetSpots(rallyId);
      setSpots(response?.data);
      setDataExtra(response?.extra);
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  const onDelSpot = async () => {
    try {
      await deleteSpot(rallyId, deleteId);
      message.success({
        content: MESSAGES.deleteSpotSuccess,
        duration: MESSAGE_DURATION
      });
      fetchSpots();
    } catch (error) {
      //
    }
  };

  const onUpateSpotOrder = async () => {
    try {
      const orderArr = spots.map((item, index) => {
        return { ...item, order_number: index + 1 };
      });
      const params = { spots: orderArr };
      await UpdateSpotOrder(rallyId, params);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    if (rallyId) {
      fetchSpots();
    }
  }, [rallyId]);

  const onCreateSpot = () => {
    if (!hasPlayer) {
      const url = `${PATHS.rallyCreateSpot.replace(
        /:rallyId/,
        rallyId
      )}?isEdit=${isEdit}`;
      router.push(url);
    } else {
      setShowErrPublicRally(true);
    }
  };

  const onNextStep = () => {
    const isAllSpotRegistered = every(spots, ["status", "registered"]);
    if (size(spots) > 2 && isAllSpotRegistered) {
      const urlSetting = isEdit
        ? PATHS.rallyCreateEditSystemSetting.replace(/:rallyId/, rallyId)
        : PATHS.rallyCreateSystemSetting.replace(/:rallyId/, rallyId);
      router.push(urlSetting);
    } else {
      setIsInValidList(true);
      setShowErrMessage(true);
    }
    onUpateSpotOrder();
  };

  const onSaveDraft = () => {
    if (!isEdit) {
      message.success({
        content: MESSAGES.saveDraft,
        duration: MESSAGE_DURATION
      });
    }
    router.push(PATHS.mypageCreator);
  };

  const onSave = () => {
    if (isDraft) {
      router.push(PATHS.mypageCreator);
    } else {
      const isAllSpotRegistered = every(spots, ["status", "registered"]);
      if (size(spots) > 2 && isAllSpotRegistered) {
        message.success({
          content: MESSAGES.updateAndSave,
          duration: MESSAGE_DURATION
        });
        router.push(PATHS.mypageCreator);
      } else {
        setIsInValidList(true);
        setShowErrMessage(true);
      }
    }
    onUpateSpotOrder();
  };

  const renderActions = () => {
    return (
      <div className={styles.btnGroup}>
        <CustomButton
          type="primary"
          className={styles.btnSubmit}
          onClick={onNextStep}
          variant="community"
        >
          {isEdit ? "更新して次へ進む" : "次へ進む"}
        </CustomButton>
        {isEdit && (
          <CustomButton
            type="primary"
            className={styles.btnSubmit}
            variant="community"
            onClick={onSave}
          >
            更新してトップに戻る
          </CustomButton>
        )}
        {!isEdit && (
          <CustomButton
            type="primary"
            className={styles.btnSaveDraft}
            variant="community"
            onClick={onSaveDraft}
          >
            {isEdit ? "キャンセル" : "下書き保存"}
          </CustomButton>
        )}
      </div>
    );
  };

  const renderSpotInfo = () => {
    return (
      <>
        <div className={styles.titleSpot}>
          スポット編集<span className={styles.required}>必須</span>
        </div>
        <div className={styles.noteSpot}>
          ※一度登録したスポットはラリー開始後に変更することはできません。
          <br />
          ※3ヶ所から7ヶ所まで登録可能です。
        </div>
      </>
    );
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const data = [...spots];
      const temp = data[fromIndex];
      data[fromIndex] = data[toIndex];
      data[toIndex] = temp;
      setSpots(data);
    },
    nodeSelector: ".ant-row"
  };

  return (
    <>
      <HeaderBack
        title={isEdit ? "ラリー編集" : "ラリー作成"}
        backUrl={`${PATHS.rallyEditInfo.replace(
          /:rallyId/,
          rallyId
        )}?isEdit=${isEdit}`}
      />
      <div className={styles.container}>
        <RallySteps current={1} isPublished={isPublished} rallyId={rallyId} />
        <RallyTitle content="スポット情報" />
        {/* {isEdit && renderSwitchRallyVersion()} */}
        {renderSpotInfo()}
        {/* {isEdit && (
          <CustomButton
            type="primary"
            variant="community"
            className={styles.btnVersion}
            onClick={() => setShowVersionModal(true)}
          >
            ラリーをバージョンアップする
          </CustomButton>
        )} */}
        <div className={styles.spotList}>
          <ReactDragListView {...dragProps}>
            {spots?.map(item => (
              <SpotItem
                key={item.id}
                item={item}
                onDelSpot={onShowModalConfirmDel}
                isInValidList={isInValidList}
                isEdit={isEdit}
              />
            ))}
          </ReactDragListView>

          {size(spots) < 7 && (
            <CustomButton
              type="primary"
              className={styles.btnAdd}
              variant="community"
              onClick={onCreateSpot}
              // disabled={hasPlayer}
            >
              ＋ スポットを追加
            </CustomButton>
          )}
        </div>
        {renderActions()}
        <ConfirmDelete
          visible={showModal}
          title="スポット削除確認"
          message="スポットの削除をします。"
          onVisible={() => setShowModal(false)}
          deleteLabel="スポット削除"
          onSuccess={onDelSpot}
        />
        {/* <DeleteSpotMessageModal
          visible={showMessage}
          onVisible={() => setShowMessage(false)}
        /> */}
        <SpotMessageModal
          visible={showErrMessage}
          onVisible={() => setShowErrMessage(false)}
        />
        {/* <RallyVersionModal
          visible={showVersionModal}
          hideModal={() => setShowVersionModal(false)}
        /> */}
        <DeleteSpotMessageModal
          visible={showCanEditModal}
          onVisible={() => setShowCanEditModal(false)}
        />
        <ErrorPublicMessageModal
          visible={showErrPublicRally}
          onVisible={() => setShowErrPublicRally(false)}
        />
      </div>
    </>
  );
};

export default CreateRallySpotListContainer;

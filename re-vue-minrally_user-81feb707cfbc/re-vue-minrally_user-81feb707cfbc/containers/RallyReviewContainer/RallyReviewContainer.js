/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
import { CustomButton } from "@components/common/buttons";
import SpotMemoryModal from "@components/Rally/Modal/SpotMemoryModal";
import CheckInSpot from "@components/Rally/RallyDetails/components/CheckInSpot";
import RallyInfo from "@components/Rally/RallyInfo";
import ReviewItem from "@components/ReviewItem";
import { useAuth } from "@contexts/auth";
import { getDetailGame, getReviewComment, getSpotGame } from "@services/game";
import { COMMENT_TYPE, QrCodeEnum } from "@utils/constants";
import { isNotExpired } from "@utils/helper";
import { List, message, Spin } from "antd";
import { filter, size } from "lodash";
import { useEffect, useState } from "react";
import styles from "./RallyReviewContainer.module.scss";

const RallyReviewContainer = ({ id, gameData }) => {
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({});
  const [reviewCmt, setReviewCmt] = useState([]);
  const [isAllSpotGps, setIsAllSpotGps] = useState(false);
  const [showModalCmt, setShowModalCmt] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (gameData) {
      setGame(gameData);
    }
  }, [gameData]);

  const fetchGameDetail = async isFirst => {
    try {
      if (isFirst) {
        setLoading(true);
      }
      const res = await getDetailGame(id);
      setGame(res);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewComment = async () => {
    try {
      const res = await getReviewComment(id);
      setReviewCmt(res);
    } catch (error) {
      message.error(error?.message);
    }
  };

  const fetchSpot = async () => {
    const spots = await getSpotGame(id);
    const spotGps = filter(
      spots,
      spot => spot?.allow_type_of_checkin === QrCodeEnum.GPS
    );
    setIsAllSpotGps(size(spots) === size(spotGps));
  };

  useEffect(() => {
    if (id) {
      fetchReviewComment();
      fetchSpot();
    }
  }, [id]);

  const listData = [];
  for (let i = 0; i < 23; i++) {
    if (i % 2 === 0)
      listData.push({
        userName: "プレイヤー名"
      });
    else
      listData.push({
        userName: "うお太郎"
      });
  }

  return (
    <>
      <Spin spinning={loading}>
        <RallyInfo
          game={game}
          fetchGameDetail={fetchGameDetail}
          isLoading={loading}
        />
        <div className={styles.content}>
          <div className={styles.title}>
            <p>レビュー</p>
            <span>{reviewCmt?.length}件</span>
          </div>
          {auth.isLoggedIn && game?.is_playing && (
            <div className={styles.actions}>
              <div className={styles.action}>
                <CustomButton
                  size="middle"
                  onClick={() => setShowModalCmt(true)}
                  disabled={!auth.isLoggedIn}
                >
                  <img
                    className={styles.iconEdit}
                    alt="ic"
                    src="/icons/ic-edit.svg"
                  />
                  レビューを書く
                </CustomButton>
              </div>
            </div>
          )}
          <List
            className={size(reviewCmt) > 0 ? styles.list : styles.listNoData}
            itemLayout="vertical"
            pagination={{
              pageSize: 5
            }}
            dataSource={reviewCmt}
            renderItem={(item, index) => (
              <ReviewItem
                item={item}
                key={index}
                onSuccess={fetchReviewComment}
                type={COMMENT_TYPE.EDIT}
              />
            )}
            locale={{ emptyText: "データがありません。" }}
          />
        </div>
        <SpotMemoryModal
          visible={showModalCmt}
          hideModal={() => setShowModalCmt(false)}
          gameId={id}
          onFinish={fetchReviewComment}
          type={COMMENT_TYPE.REVIEW}
        />
      </Spin>
      {isAllSpotGps &&
        isNotExpired(gameData?.start_date, gameData?.end_date) && (
          <CheckInSpot
            gameId={id}
            callback={fetchGameDetail}
            rallyName={game?.name}
          />
        )}
    </>
  );
};

export default RallyReviewContainer;

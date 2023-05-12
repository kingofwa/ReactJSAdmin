/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
import { CustomButton } from "@components/common/buttons";
import HeadMeta from "@components/HeadMeta";
import {
  addUserFollower,
  deleteUserFollower
} from "@components/mypage/service";
import SpotMemoryModal from "@components/Rally/Modal/SpotMemoryModal";
import ReviewItem from "@components/ReviewItem";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { favoriteSeri, unFavoriteSeri } from "@services/profile";
import { getReviewComment } from "@services/seri";
import { COMMENT_TYPE, STATUS_RESPONSE } from "@utils/constants";
import { List, message } from "antd";
import { size } from "lodash";
import { useCallback, useContext, useEffect, useState } from "react";
import HeaderSeri from "../components/Header";
import { getSeriesDetail } from "../services";
import styles from "./styles.module.scss";

const SeriReviewPage = ({ serieId, serieDetail }) => {
  const [reviewCmt, setReviewCmt] = useState([]);
  const [showModalCmt, setShowModalCmt] = useState(false);
  const [serieData, setSerieData] = useState();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (serieDetail) {
      setSerieData(serieDetail);
    }
  }, [serieDetail]);

  const fetchSeriesDetail = async isFirst => {
    try {
      if (isFirst) {
        setIsLoading(true);
      }
      showLoadingAnim();
      const data = await getSeriesDetail(serieId);
      setSerieData(data);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim(false);
      setIsLoading(false);
    }
  };

  const fetchReviewComment = async () => {
    try {
      showLoadingAnim();
      const res = await getReviewComment(serieId);
      setReviewCmt(res);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim(false);
    }
  };

  useEffect(() => {
    if (serieId) {
      fetchReviewComment();
    }
  }, [serieId]);

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

  const handleFavoriteSeri = useCallback(() => {
    if (auth.isLoggedIn) {
      if (serieData?.is_favorite) {
        unFavoriteSeri(serieId)
          .then(
            res => res.status === STATUS_RESPONSE.success && fetchSeriesDetail()
          )
          .finally(hideLoadingAnim());
      } else {
        favoriteSeri({ serie_id: serieId })
          .then(
            res => res.status === STATUS_RESPONSE.success && fetchSeriesDetail()
          )
          .finally(hideLoadingAnim());
      }
    } else {
      // router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
      const newSerieData = {
        ...serieData,
        is_favorite: !serieData.is_favorite,
        number_of_favorites: serieData.is_favorite
          ? serieData?.number_of_favorites - 1
          : serieData?.number_of_favorites + 1
      };
      setSerieData(newSerieData);
    }
  }, [serieId, serieData?.is_favorite]);

  const handleFollow = useCallback(
    id => {
      showLoadingAnim();
      addUserFollower({ user_id: id })
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            fetchSeriesDetail();
          }
        })
        .finally(hideLoadingAnim());
    },
    [serieId, serieData?.is_following]
  );

  const handleUnFollow = useCallback(
    id => {
      showLoadingAnim();
      deleteUserFollower(id)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            fetchSeriesDetail();
          }
        })
        .finally(hideLoadingAnim());
    },
    [serieId, serieData?.is_following]
  );

  const handleFollowUser = () => {
    return !serieData?.owner?.is_following
      ? handleFollow(serieData?.owner?.id)
      : handleUnFollow(serieData?.owner?.id);
  };

  const defaultImgUrl = `${process.env.NEXT_PUBLIC_APP_HOST}/img/rally-placeholder-image.png`;

  return (
    <>
      <HeadMeta
        title={`${serieData?.name || "グランドラリー名"} | みんラリ`}
        description={`${serieData?.description || "グランドラリー説明"}`}
        imgUrl={
          serieData?.top_photo_url ||
          serieData?.google_image_url ||
          defaultImgUrl
        }
      />
      <HeaderSeri
        serieDetail={serieData}
        handleFavoriteSeri={handleFavoriteSeri}
        handleFollowUser={handleFollowUser}
        serieId={serieId}
        isLoading={isLoading}
      />
      <div className={styles.content}>
        <div className={styles.title}>
          <p>レビュー</p>
          <span>{reviewCmt.length}件</span>
        </div>
        {auth.isLoggedIn && serieData?.is_playing && (
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
        gameId={serieId}
        onFinish={fetchReviewComment}
        type={COMMENT_TYPE.REVIEW_SERI}
      />
    </>
  );
};

export default SeriReviewPage;

/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import SpotMemoryModal from "@components/Rally/Modal/SpotMemoryModal";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { deleteComment, likeComment, unLikeComment } from "@services/user/info";
import { DATE_DOT } from "@utils/date";
import { Dropdown, Menu, message } from "antd";
import { size } from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { MESSAGES } from "@config/messages";
import { MESSAGE_DURATION } from "@utils/constants";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import styles from "./ReviewItem.module.scss";

const ReviewItem = ({
  item,
  onSuccess,
  type,
  showCountComment,
  editReply,
  isDetail = false,
  isSpot = false
}) => {
  const router = useRouter();
  const auth = useAuth();
  const [showModalCmt, setShowModalCmt] = useState(false);
  const [changeContent, setChangeContent] = useState(false);
  const [isOpenLightBox, setIsOpenLightBox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const onClickLike = async () => {
    if (auth.isLoggedIn) {
      if (!item?.is_liked) {
        await likeComment(item?.id);
      } else {
        await unLikeComment(item?.id);
      }
      await onSuccess();
    } else {
      router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
    }
  };

  const onDeleteCmt = async () => {
    try {
      if (auth.isLoggedIn && auth?.user?.id === item?.user?.id) {
        await deleteComment(item?.id);
        message.success({
          content: MESSAGES.deleteSuccess,
          duration: MESSAGE_DURATION
        });
        await onSuccess();
      }
    } catch (error) {
      message.error(error);
    }
  };

  const onShowModalCmt = () => {
    if (auth.isLoggedIn && auth?.user?.id === item?.user?.id) {
      // when reply comment - not upload image
      if (editReply) {
        editReply(item);
      }
      // add comment normal - with muilti upload image
      else {
        setShowModalCmt(true);
        setChangeContent(!changeContent);
      }
    }
  };

  const onShowLightBox = index => {
    setPhotoIndex(index);
    setIsOpenLightBox(true);
  };

  const renderImages = () => {
    return (
      <>
        <div className={styles.images}>
          {item?.photo_urls?.map((photo, index) => (
            <div
              key={index}
              className={styles.image}
              onClick={() => onShowLightBox(index)}
            >
              <img src={photo || "/img/placeholder-img.png"} alt="img" />
            </div>
          ))}
        </div>

        {isOpenLightBox && item?.photo_urls && (
          <Lightbox
            mainSrc={item?.photo_urls[photoIndex]}
            nextSrc={
              item?.photo_urls[(photoIndex + 1) % item?.photo_urls.length]
            }
            prevSrc={
              item?.photo_urls[
                (photoIndex + item?.photo_urls.length - 1) %
                  item?.photo_urls.length
              ]
            }
            onCloseRequest={() => setIsOpenLightBox(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + item?.photo_urls.length - 1) %
                  item?.photo_urls.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % item?.photo_urls.length)
            }
          />
        )}
      </>
    );
  };

  const menu = () => {
    // if (auth.isLoggedIn && auth?.user?.id === item?.user?.id) {
    return (
      <Menu
        className={styles.popup}
        items={[
          {
            key: "1",
            label: (
              <p className={styles.popupItem} onClick={onShowModalCmt}>
                編集する
              </p>
            )
          },
          {
            key: "2",
            label: (
              <p className={styles.popupItem} onClick={onDeleteCmt}>
                削除する
              </p>
            )
          }
          // {
          //   key: "3",
          //   label: <p className={styles.popupItem}>通報する</p>
          // }
        ]}
      />
    );
    // }
    // return (
    //   <Menu
    //     className={styles.popup}
    //     items={[
    //       {
    //         key: "3",
    //         label: <p className={styles.popupItem}>通報する</p>
    //       }
    //     ]}
    //   />
    // );
  };

  const renderAction = () => {
    return (
      <Dropdown overlay={menu} placement="bottomRight" arrow trigger="click">
        <img
          src="/icons/ic-dot.svg"
          className={styles.icAction}
          alt="ic-action"
        />
      </Dropdown>
    );
  };

  const onGoCmtDetail = () => {
    const redirectUrl = PATHS.rallyReplyComment.replace(/:id/, item?.id);
    if (auth?.isLoggedIn) {
      if (isSpot) {
        router.replace(`${redirectUrl}?type=spot`);
      } else {
        router.replace(redirectUrl);
      }
    } else {
      router.push(`${PATHS.login}?redirectTo=${redirectUrl}`);
    }
  };

  const renderCommentInfo = () => {
    const txt = item?.body;
    const limitW = 120;
    const lengthCmt = size(txt);
    const showSeeMore = lengthCmt > limitW;
    const txtStart = txt?.slice(0, limitW);
    if (showSeeMore && !isDetail) {
      return (
        <p className={styles.content}>
          {txtStart}
          <span className={styles.seeMore} onClick={onGoCmtDetail}>
            …続きを見る
          </span>
        </p>
      );
    }
    return <p className={styles.content}>{item?.body}</p>;
  };

  const goToDetail = () => {
    router.push({
      pathname: PATHS.profilePlayerRally,
      query: { id: item.user.id }
    });
  };

  return (
    <>
      <div className={styles.reviewItem}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.avatar} onClick={goToDetail}>
              <img
                src={item?.user?.avatar_url || "/img/avatar-holder.svg"}
                alt="avt"
              />
            </div>
            <p className={styles.userName}>{item?.user?.user_name}</p>
            <p className={styles.date}>
              {moment(item?.created_at).format(DATE_DOT)}
            </p>
          </div>
          {auth.isLoggedIn && item?.is_owner && renderAction()}
        </div>
        {/* <p className={styles.content}>{item?.body}</p> */}
        {renderCommentInfo()}
        {renderImages()}
        <div className={styles.reaction}>
          <div className={styles.like} onClick={onClickLike}>
            <img
              src={
                item?.is_liked
                  ? "/icons/ic-action-like.svg"
                  : "/icons/ic-action-unlike.svg"
              }
              className={styles.icLike}
              alt="ic-like"
            />
            <p className={styles.likeCount}>{item?.number_of_likes}</p>
          </div>
          {/* mode reply  */}
          {!showCountComment && (
            <div className={styles.comment} onClick={onGoCmtDetail}>
              <img
                className={styles.icComment}
                src="/icons/ic-comment.svg"
                alt="ic-cmt"
              />
              <p className={styles.commentTitle}>
                {item?.number_of_replies
                  ? `${item?.number_of_replies}件の返信`
                  : "返信する"}
              </p>
            </div>
          )}
        </div>
        <SpotMemoryModal
          visible={showModalCmt}
          hideModal={() => setShowModalCmt(false)}
          onFinish={onSuccess}
          type={type}
          changeContent={changeContent}
          commentInfo={item}
          isSpot={isSpot}
        />
      </div>
    </>
  );
};

export default ReviewItem;

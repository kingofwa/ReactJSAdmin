// import { DATE_DOT } from "@utils/date";
// import moment from "moment";
// import React from "react";
import { ACTIVITY_TYPE } from "@config/constants";
import { DATE_TIME_DOT } from "@utils/date";
import { get } from "lodash";
import moment from "moment-timezone";
import Link from "next/link";
import PATHS from "@config/paths";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

const PostItem = ({ item }) => {
  const defaultAvt = "/img/avatar-holder.svg";
  const router = useRouter();

  const goProfile = () => {
    const isCreator = item?.user?.is_creator;
    if (isCreator) {
      router.push(PATHS.profileCreatorRally.replace(/\[id\]/, item?.user?.id));
    } else {
      router.push(PATHS.profilePlayerRally.replace(/\[id\]/, item?.user?.id));
    }
  };

  const activityType = get(item, "content.activity_type");

  const renderTitle = () => {
    if (activityType === ACTIVITY_TYPE.COMPLETED_SERIE) {
      const serieName = get(item, "content.serie_name");
      const subText = get(item, "content.sub_text").replace(
        /\[serie_name\]/,
        ""
      );
      const serieId = get(item, "content.serie_id");
      const urlSeries = PATHS.series.replace(/\[id\]/, serieId);
      return (
        <div className={styles.content}>
          <Link href={urlSeries}>
            <span className={styles.textLink}>{serieName}</span>
          </Link>
          <span>{subText}</span>
        </div>
      );
    }
    if (activityType === ACTIVITY_TYPE.FAVORITE_GRAND) {
      const serieName = get(item, "content.serie_name");
      const subText = get(item, "content.sub_text").replace(
        /\[serie_name\]/,
        ""
      );
      const serieId = get(item, "content.serie_id");
      const urlSeries = PATHS.series.replace(/\[id\]/, serieId);
      return (
        <div className={styles.content}>
          <Link href={urlSeries}>
            <span className={styles.textLink}>{serieName}</span>
          </Link>
          <span>{subText}</span>
          <img
            src="/icons/ic-like-rally.png"
            alt="ic-like"
            className={styles.iconLike}
          />
        </div>
      );
    }
    if (activityType === ACTIVITY_TYPE.CHECKED_IN_SPOT) {
      const gameName = get(item, "content.game_name");
      const spotName = get(item, "content.spot_name");
      const gameId = get(item, "content.game_id");
      const spotId = get(item, "content.spot_id");
      const gameDetailUrl = PATHS.rallyDetail.replace(/\[id\]/, gameId);
      const spotDetailUrl = `${PATHS.rallyMypageSpotDetail}/${spotId}`;
      const subText = get(item, "content.sub_text")
        .replace(/\[game_name\]/, "")
        .replace(/の\[spot_name\]/, "");
      return (
        <div className={styles.content}>
          <Link href={gameDetailUrl}>
            <span className={styles.textLink}>{gameName}</span>
          </Link>
          の
          <Link href={spotDetailUrl}>
            <span className={styles.textLink}>{spotName}</span>
          </Link>
          <span>{subText}</span>
        </div>
      );
    }
    if (
      activityType === ACTIVITY_TYPE.CREATED_RALLY ||
      activityType === ACTIVITY_TYPE.COMPLETED_GAME
    ) {
      const gameName = get(item, "content.game_name");
      const gameId = get(item, "content.game_id");
      const gameDetailUrl = PATHS.rallyDetail.replace(/\[id\]/, gameId);
      const subText = get(item, "content.sub_text").replace(
        /\[game_name\]/,
        ""
      );

      return (
        <div className={styles.content}>
          <Link href={gameDetailUrl}>
            <span className={styles.textLink}>{gameName}</span>
          </Link>
          <span>{subText}</span>
        </div>
      );
    }
    if (activityType === ACTIVITY_TYPE.FAVORITE_RALLY) {
      const gameName = get(item, "content.game_name");
      const gameId = get(item, "content.game_id");
      const gameDetailUrl = PATHS.rallyDetail.replace(/\[id\]/, gameId);
      const subText = get(item, "content.sub_text").replace(
        /\[game_name\]/,
        ""
      );

      return (
        <div className={styles.content}>
          <Link href={gameDetailUrl}>
            <span className={styles.textLink}>{gameName}</span>
          </Link>
          <span>{subText}</span>
          <img
            src="/icons/ic-like-rally.png"
            alt="ic-like"
            className={styles.iconLike}
          />
        </div>
      );
    }
    return <div className={styles.content}>{item?.title}</div>;
  };

  return (
    <div className={styles.historyItem}>
      <div className={styles.head}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar} onClick={goProfile}>
            <img src={item?.user?.avatar_url || defaultAvt} alt="avatar-user" />
          </div>
          <span className={styles.name} onClick={goProfile}>
            {item?.user?.user_name}
          </span>
        </div>
        <div className={styles.date}>
          {moment(item?.created_at).tz("Asia/Tokyo").format(DATE_TIME_DOT)}
        </div>
      </div>
      {renderTitle()}
      <div className={styles.imgPost}>
        <img
          src={
            item?.related_entity?.photo_url ||
            "/img/rally-placeholder-image.png"
          }
          alt="imgPost"
        />
      </div>
    </div>
  );
};

export default PostItem;

import { viewNotification } from "@services/notifications";
import { DATE_DOT } from "@utils/date";
import moment from "moment";
import { useContext } from "react";
import { useAuth } from "@contexts/auth";
import { get } from "lodash";
import { NOTIFICATION_ACTION_TYPE } from "@config/constants";
import PATHS from "@config/paths";
import { useRouter } from "next/router";
import { NotificationContext } from "@contexts/notification";
import styles from "./styles.module.scss";

const UserNotification = ({ item, onUpdateNotice }) => {
  const auth = useAuth();
  const { checkNotifications } = useContext(NotificationContext);
  const router = useRouter();

  const onViewed = async () => {
    try {
      if (!item?.is_viewed) {
        await viewNotification(item?.id);
        checkNotifications();
      }
      onUpdateNotice(item?.id);
    } catch (error) {
      //
    }
  };

  const renderKind = () => {
    const { kind } = item;
    if (kind === "system") {
      return <p className={styles.player}>システム</p>;
    }
    if (kind === "campaign") {
      return <p className={styles.creator}>キャンペーン</p>;
    }
    if (kind === "player") {
      return <p className={styles.player}>プレイヤー</p>;
    }
    if (kind === "rally_master") {
      return <p className={styles.creator}>ラリーマスター</p>;
    }
    if (kind === "other") {
      return <p className={styles.other}>その他</p>;
    }
    return null;
  };

  const getAction = () => {
    return get(item, "content.action");
  };

  const getUserName = () => {
    return get(item, "content.executor.user_name");
  };

  const getTargetName = () => {
    return get(item, "content.target.name");
  };

  const getTitle = () => {
    let title = "";
    switch (getAction()) {
      case NOTIFICATION_ACTION_TYPE.PLAYER_FOLLOWING:
        title = `${getUserName()}さんにフォローされました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_TOP_INDIVIDUAL:
        title = `${getTargetName()}ランキングトップ100に入りました!`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_COMMENT_SPOT:
        title = `${getUserName()}さんがあなたの${getTargetName()}ラリーのスポットメモリーに返信しました。!`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_REPLY_COMMENT_SPOT:
        title = `${getUserName()}さんがあなたの${getTargetName()}ラリーのスポットメモリーに返信しました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REPLY_COMMENT_SPOT:
        title = `${getUserName()}さんがあなたの${getTargetName()}ラリーの返信にいいねしました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_SPOT_MEMORY:
        title = `${getUserName()}さんがあなたの${getTargetName()}ラリーのスポットメモリーにいいねしました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REVIEW:
        title = `${getUserName()}さんがあなたの${getTargetName()}ラリーのレビューにいいねしました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REVIEW_RALLY:
        title = `${getUserName()}さんがあなたの${getTargetName()}ラリーのスポットメモリーにいいねしました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_REPLY_REVIEW_RALLY:
        title = `${getUserName()}さんがあなたの${getTargetName()}ラリーのレビューに返信しました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REPLY_REVIEW_RALLY:
        title = `${getUserName()}さんがあなたの${getTargetName()}ラリーの返信にいいねしました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_NEW_MEMORY_SPOT:
        title = `あなたの${getTargetName()}ラリーにスポットメモリーが投稿されました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_REVIEW_RALLY:
        title = `あなたの${getTargetName()}ラリーにレビューが投稿されました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_TOP_RALLY:
        title = `あなたの${getTargetName()}ラリーが${getTargetName()}ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_TOP_INDIVIDUAL:
        title = `${getTargetName()}ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_APPLICATION_ACCEPTED:
        title = `ラリーマスター申請が承認されました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_APPLICATION_REJECTED:
        title = `ラリーマスター申請が却下されました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_RALLIES_COMPLETED_COUNT:
        title = `制覇ラリー数ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_RALLIES_JOINED_COUNT:
        title = `参加ラリー数ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_TRAVELED_DISTANCE:
        title = `総移動距離ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_CHECKED_COUNT:
        title = `チェックイン数ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_FAVORITE_GAME:
        title = `${getUserName()}さんがあなたの${getTargetName()}ラリーにいいねしました`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_FAVORITE_SERIE:
        title = `${getUserName()}さんがあなたの${getTargetName()}グランドラリーにいいねしました`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_CHECKED_COUNT:
        title = `あなたの${getTargetName()}ラリーがチェックイン数ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_PLAYER_COUNT:
        title = `あなたの${getTargetName()}ラリーが参加者数ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_FOLLOWER_COUNT:
        title = `フォロワー数ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_RALLIES_CREATED_COUNT:
        title = `作成ラリー数ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_PEOPLE_CHECKED_COUNT:
        title = `累計チェックイン数ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_PEOPLE_TRAVELED_DISTANCE:
        title = `累計移動距離数ランキングトップ100に入りました！`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_REVIEW_SERIES:
        title = `あなたの${getTargetName()}グランドラリーにレビューが投稿されました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REVIEW_SERIES:
        title = `${getUserName()}さんがあなたの${getTargetName()}グランドラリーのレビューにいいねしました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_REPLY_REVIEW_SERIES:
        title = `${getUserName()} さんがあなたの${getTargetName()} グランドラリーのレビューに返信しました。`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REPLY_REVIEW_SERIES:
        title = `${getUserName()}さんがあなたの${getTargetName()}グランドラリーの返信にいいねしました。`;
        break;
      default:
        break;
    }
    return title;
  };

  const goRankingDetail = () => {
    const id = get(item, "content.target.id");
    router.push(PATHS.profileCreatorRally.replace(/\[id\]/, id));
  };

  const goRallyDetail = () => {
    const id = get(item, "content.target.id");
    const url = `${PATHS.rally}/${id}`;
    router.push(url);
  };

  const urlSpotDetail = () => {
    const id = get(item, "content.target.target_id");
    const url = `${PATHS.rallyReplyComment.replace(/:id/, id)}?type=spot`;
    return url;
  };

  const urlReviewDetail = () => {
    const id = get(item, "content.target.id");
    const url = PATHS.rallyReplyComment.replace(/:id/, id);
    return url;
  };
  const urlCommentSpot = () => {
    const id = get(item, "content.target.id");
    const url = `${PATHS.rallyReplyComment.replace(/:id/, id)}?type=spot`;
    return url;
  };
  const urlReviewRally = () => {
    const id = get(item, "content.target.id");
    const url = PATHS.rallyReplyComment.replace(/:id/, id);
    return url;
  };
  const urlProfile = () => {
    const id = get(item, "content.executor.id");
    const url = PATHS.profileCreatorRally.replace(/\[id\]/, id);
    return url;
  };

  const urlRankingDetail = type => {
    let url = "";
    switch (type) {
      case NOTIFICATION_ACTION_TYPE.PLAYER_RALLIES_COMPLETED_COUNT:
        url = `${PATHS.rankingUser}/rallies-completed-count`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_RALLIES_JOINED_COUNT:
        url = `${PATHS.rankingUser}/rallies-joined-count`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_TRAVELED_DISTANCE:
        url = `${PATHS.rankingUser}/traveled-distance`;
        break;
      case NOTIFICATION_ACTION_TYPE.PLAYER_CHECKED_COUNT:
        url = `${PATHS.rankingUser}/checked-count`;
        break;
      default:
        break;
    }
    return url;
  };

  const urlGameDetail = () => {
    const id = get(item, "content.target.id");
    const url = PATHS.rallyDetail.replace(/\[id\]/, id);
    return url;
  };

  const urlGrandDetail = () => {
    const id = get(item, "content.target.id");
    const url = PATHS.series.replace(/\[id\]/, id);
    return url;
  };

  const urlCreator = () => {
    const url = `${PATHS.mypageCreator}`;
    return url;
  };

  const urlRankingRally = type => {
    let url = "";
    switch (type) {
      case NOTIFICATION_ACTION_TYPE.MASTER_CHECKED_COUNT:
        url = `${PATHS.rankingRally}?type=checked_count`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_PLAYER_COUNT:
        url = `${PATHS.rankingRally}?type=player_count`;
        break;
      default:
        break;
    }
    return url;
  };

  const urlRankingCreator = type => {
    let url = "";
    switch (type) {
      case NOTIFICATION_ACTION_TYPE.MASTER_FOLLOWER_COUNT:
        url = `${PATHS.followerCount}`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_RALLIES_CREATED_COUNT:
        url = `${PATHS.ralliesCreatedCount}`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_PEOPLE_CHECKED_COUNT:
        url = `${PATHS.peopleCheckedCount}`;
        break;
      case NOTIFICATION_ACTION_TYPE.MASTER_PEOPLE_TRAVELED_DISTANCE:
        url = `${PATHS.peopleTraveledDistance}`;
        break;
      default:
        break;
    }
    return url;
  };

  const renderContent = () => {
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_FOLLOWING) {
      return (
        <div className={styles.content}>
          <a href={urlProfile()} className={styles.link}>
            {getUserName()}さんのプロフィールを確認する
          </a>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_TOP_INDIVIDUAL) {
      return (
        <div className={styles.content}>
          おめでとうございます🎉
          <br />
          <span style={styles.link}>{getTargetName()}</span>
          ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          <span style={styles.link}>{getTargetName()}</span>
          ランキングは
          <span className={styles.link} onClick={goRankingDetail}>
            こちら
          </span>
        </div>
      );
    }
    if (
      getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_COMMENT_SPOT ||
      getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_SPOT_MEMORY
    ) {
      return (
        <div className={styles.link}>
          <a href={urlCommentSpot()} className={styles.link}>
            スポットメモリーを確認する
          </a>
        </div>
      );
    }
    if (
      getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_REPLY_COMMENT_SPOT ||
      getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REPLY_COMMENT_SPOT
    ) {
      return (
        <div className={styles.link}>
          <a href={urlCommentSpot()} className={styles.link}>
            スポットメモリーを確認する
          </a>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_REPLY_REVIEW_RALLY) {
      return (
        <div className={styles.link}>
          <a href={urlReviewDetail()} className={styles.link}>
            レビューを確認する
          </a>
        </div>
      );
    }
    if (
      getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REPLY_REVIEW_RALLY
    ) {
      return (
        <div className={styles.link}>
          <a href={urlReviewDetail()} className={styles.link}>
            レビューを確認する
          </a>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_SPOT) {
      return (
        <div className={styles.link}>
          <a href={urlCommentSpot()} className={styles.link}>
            スポットメモリーを確認する
          </a>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REVIEW) {
      return (
        <div className={styles.link}>
          <a href={urlReviewDetail()} className={styles.link}>
            レビューを確認する
          </a>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_NEW_MEMORY_SPOT) {
      return (
        <div className={styles.link}>
          <a href={urlSpotDetail()} className={styles.link}>
            {getTargetName()}ラリーのスポットメモリーを確認する
          </a>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_REVIEW_RALLY) {
      return (
        <div className={styles.link}>
          <a href={urlReviewRally()} className={styles.link}>
            {getTargetName()}ラリーのレビューを確認する
          </a>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_TOP_RALLY) {
      return (
        <div className={styles.link}>
          おめでとうございます🎉
          <br />
          あなたの{getTargetName()}ラリーが{getTargetName()}
          ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          <span onClick={goRankingDetail}>
            {getTargetName()}ランキングはこちら
          </span>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_TOP_INDIVIDUAL) {
      return (
        <div className={styles.content}>
          おめでとうございます🎉
          <br />
          {getTargetName()}ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          <span onClick={goRankingDetail}>
            {getTargetName()}ランキングはこちら
          </span>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_APPLICATION_ACCEPTED) {
      return (
        <a href={urlCreator()} className={styles.link}>
          おめでとうございます🎉
          <br />
          ラリーマスター申請が承認されました。
          <br />
          ラリーマスターマイページより、ラリーを作成いただけます。
          <br />
          <span onClick={goRallyDetail}>ラリーマスターマイページはこちら</span>
        </a>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_APPLICATION_REJECTED) {
      return (
        <div className={styles.content}>
          あなたのラリーマスター申請は承認されませんでした。
          <br />
          申請内容を今一度ご確認の上、再度申請をお願いいたします。
        </div>
      );
    }
    if (
      getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_RALLIES_COMPLETED_COUNT
    ) {
      return (
        <a
          href={urlRankingDetail(
            NOTIFICATION_ACTION_TYPE.PLAYER_RALLIES_COMPLETED_COUNT
          )}
          className={styles.link}
        >
          おめでとうございます🎉 <br />
          制覇ラリー数ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          制覇ラリー数ランキングはこちら
        </a>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_RALLIES_JOINED_COUNT) {
      return (
        <a
          href={urlRankingDetail(
            NOTIFICATION_ACTION_TYPE.PLAYER_RALLIES_JOINED_COUNT
          )}
          className={styles.link}
        >
          おめでとうございます🎉 <br />
          参加ラリー数ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          参加ラリー数ランキングはこちら
        </a>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_TRAVELED_DISTANCE) {
      return (
        <a
          href={urlRankingDetail(
            NOTIFICATION_ACTION_TYPE.PLAYER_TRAVELED_DISTANCE
          )}
          className={styles.link}
        >
          おめでとうございます🎉 <br />
          総移動距離ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          総移動距離ランキングはこちら
        </a>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_CHECKED_COUNT) {
      return (
        <a
          href={urlRankingDetail(NOTIFICATION_ACTION_TYPE.PLAYER_CHECKED_COUNT)}
          className={styles.link}
        >
          おめでとうございます🎉 <br />
          チェックイン数ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          チェックイン数ランキングはこちら
        </a>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_FAVORITE_GAME) {
      return (
        <a href={urlGameDetail()} className={styles.link}>
          {getTargetName()}ラリーを確認する
        </a>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_FAVORITE_SERIE) {
      return (
        <a href={urlGrandDetail()} className={styles.link}>
          {getTargetName()}グランドラリーを確認する
        </a>
      );
    }

    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_CHECKED_COUNT) {
      return (
        <a
          href={urlRankingRally(NOTIFICATION_ACTION_TYPE.MASTER_CHECKED_COUNT)}
          className={styles.link}
        >
          おめでとうございます🎉
          <br />
          あなたの{getTargetName()}
          ラリーはチェックイン数が多いラリーランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          チェックイン数が多いラリーランキングはこちら
          <br />
        </a>
      );
    }

    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_PLAYER_COUNT) {
      return (
        <a
          href={urlRankingRally(NOTIFICATION_ACTION_TYPE.MASTER_PLAYER_COUNT)}
          className={styles.link}
        >
          おめでとうございます🎉
          <br />
          あなたの{getTargetName()}
          ラリーは参加者数が多いラリーランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          参加者数が多いラリーランキングはこちら
        </a>
      );
    }

    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_FOLLOWER_COUNT) {
      return (
        <a
          href={urlRankingCreator(
            NOTIFICATION_ACTION_TYPE.MASTER_FOLLOWER_COUNT
          )}
          className={styles.link}
        >
          おめでとうございます🎉
          <br />
          フォロワー数ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          フォロワー数ランキングはこちら
          <br />
        </a>
      );
    }

    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_RALLIES_CREATED_COUNT) {
      return (
        <a
          href={urlRankingCreator(
            NOTIFICATION_ACTION_TYPE.MASTER_RALLIES_CREATED_COUNT
          )}
          className={styles.link}
        >
          おめでとうございます🎉
          <br />
          作成ラリー数ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          作成ラリー数ランキングはこちら
          <br />
        </a>
      );
    }

    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_PEOPLE_CHECKED_COUNT) {
      return (
        <a
          href={urlRankingCreator(
            NOTIFICATION_ACTION_TYPE.MASTER_PEOPLE_CHECKED_COUNT
          )}
          className={styles.link}
        >
          おめでとうございます🎉
          <br />
          累計チェックイン数ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          累計チェックイン数ランキングはこちら
          <br />
        </a>
      );
    }

    if (
      getAction() === NOTIFICATION_ACTION_TYPE.MASTER_PEOPLE_TRAVELED_DISTANCE
    ) {
      return (
        <a
          href={urlRankingCreator(
            NOTIFICATION_ACTION_TYPE.MASTER_PEOPLE_TRAVELED_DISTANCE
          )}
          className={styles.link}
        >
          おめでとうございます🎉
          <br />
          累計移動距離数ランキングトップ100に入りました。
          <br />
          さらに上位を目指しましょう！
          <br />
          累計移動距離数ランキングはこちら
          <br />
        </a>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.MASTER_REVIEW_SERIES) {
      return (
        <div className={styles.link}>
          <a href={urlReviewDetail()} className={styles.link}>
            {getTargetName()}グランドラリーのレビューを確認する
          </a>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REVIEW_SERIES) {
      return (
        <div className={styles.link}>
          <a href={urlReviewDetail()} className={styles.link}>
            レビューを確認する
          </a>
        </div>
      );
    }
    if (getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_REPLY_REVIEW_SERIES) {
      return (
        <div className={styles.link}>
          <a href={urlReviewDetail()} className={styles.link}>
            レビューを確認する
          </a>
        </div>
      );
    }
    if (
      getAction() === NOTIFICATION_ACTION_TYPE.PLAYER_LIKE_REPLY_REVIEW_SERIES
    ) {
      return (
        <div className={styles.link}>
          <a href={urlReviewDetail()} className={styles.link}>
            レビューを確認する
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div
        className={
          item?.is_viewed || !auth.isLoggedIn
            ? styles.newsItemViewed
            : styles.newsItem
        }
      >
        <div className={styles.info}>
          <div className={styles.row}>
            <p className={styles.date}>
              {moment(item?.created_at).format(DATE_DOT)}
            </p>
            {renderKind()}
          </div>
          <div className={styles.rowTitle} onClick={onViewed}>
            <p className={styles.title}>{getTitle()}</p>
            <div className={styles.collapse}>
              {item?.is_collapse ? (
                <img
                  src="/icons/ic-up.svg"
                  alt="collapse"
                  className={styles.collapseIcon}
                />
              ) : (
                <img
                  src="/icons/ic-down.svg"
                  alt="collapse"
                  className={styles.collapseIcon}
                />
              )}
            </div>
          </div>
        </div>
        {item?.is_collapse && renderContent()}
      </div>
    </>
  );
};

export default UserNotification;

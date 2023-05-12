// Default rally item

import PATHS from "@config/paths";
import { DATE_DOT } from "@utils/date";
import moment from "moment";
import { useRouter } from "next/router";
// import { useAuth } from "@contexts/auth";
import { replace } from "lodash";
import styles from "./styles.module.scss";

const STATUS_UPDATE = {
  public: "公開",
  updated: "更新"
};

const RallyItem = ({
  item,
  goDetail,
  goProfile,
  rank,
  handleFavorite,
  handleUnfavorite,
  isGrandRally
}) => {
  const router = useRouter();
  // const auth = useAuth();

  const renderRank = index => {
    return (
      <div className={styles.ranking}>
        {index < 4 && (
          <img
            src={`/icons/ic-rank-${index}.svg`}
            alt="ranking"
            className={styles.rankIcon}
          />
        )}
        <span className={styles.rank}>{index}位</span>
      </div>
    );
  };

  const date = moment(item?.updated_at).format(DATE_DOT);

  const handleFavoriteRally = () => {
    // if (auth.isLoggedIn) {
    if (item?.is_favorite) {
      handleUnfavorite(item.id);
    } else {
      handleFavorite(item.id);
    }
    // } else {
    //   router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
    // }
  };

  return (
    <div className={styles.cardWrapper}>
      {rank && renderRank(rank)}
      <div className={rank ? styles.cardRank : `${styles.card} ${styles.w100}`}>
        <div className={styles.image} onClick={() => goDetail(item?.id)}>
          <img
            src={
              item?.top_photo_url ||
              item?.google_image_url ||
              "/img/rally-placeholder-image.png"
            }
            alt="card-img"
          />
          {item?.pr && <span className={styles.pr}>PR</span>}
          <span className={styles.date}>{`${date} ${
            item.created_at !== item.updated_at
              ? STATUS_UPDATE.updated
              : STATUS_UPDATE.public
          }`}</span>
        </div>
        <div className={styles.info}>
          <div className={styles.tags}>
            {item?.tag_list?.map(tag => {
              const tagValue = replace(tag, new RegExp(/#/, "g"), "");
              return (
                <span
                  className={styles.tag}
                  key={tag + Math.random()}
                  onClick={() => {
                    router.push(`${PATHS.searchRallyResult}?tag=${tagValue}`);
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <div className={styles.titleName} onClick={() => goDetail(item?.id)}>
            {isGrandRally && (
              <img
                className={styles.grandIcon}
                src="/icons/ic-grand.svg"
                alt="icon"
              />
            )}
            <div className={styles.name}>{item?.name}</div>
          </div>
          <div className={styles.reaction}>
            <div className={styles.reactionItem}>
              <img
                className={styles.reactionIcon}
                src="/icons/ic-participation.svg"
                alt="icon"
              />
              <span className={styles.reactionLabel}>
                {item?.number_of_players}
              </span>
            </div>
            <div className={styles.reactionItem}>
              <img
                className={styles.reactionIcon}
                src="/icons/ic-read.svg"
                alt="icon"
              />
              <span className={styles.reactionLabel}>
                {item?.number_of_checked_in}
              </span>
            </div>
            <div className={styles.reactionItem}>
              <div onClick={handleFavoriteRally}>
                <img
                  className={styles.reactionIcon}
                  src={
                    !item?.is_favorite
                      ? "/icons/ic-un-like.svg"
                      : "/icons/ic-like.svg"
                  }
                  alt="icon"
                />
              </div>
              <span className={styles.reactionLabel}>
                {item?.number_of_favorites}
              </span>
            </div>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.user}>
              <div
                className={styles.avatar}
                onClick={() => goProfile(item?.owner?.id)}
              >
                <img
                  src={item?.owner?.avatar_url || "/img/avatar-holder.svg"}
                  alt="avatar"
                />
              </div>
              <span
                className={styles.userName}
                onClick={() => goProfile(item?.owner?.id)}
              >
                {item?.owner?.user_name}
              </span>
            </div>
            <span className={styles.listDate}>{date}更新</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RallyItem;

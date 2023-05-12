import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { replace } from "lodash";
import { useRouter } from "next/router";
import styles from "./RallyInfo.module.scss";

const bannerDefault = "/img/rally-placeholder-image.png";
const avatarDefault = "/img/avatar-holder.svg";
const RallyInfo = ({ game }) => {
  const auth = useAuth();
  const router = useRouter();

  const goSearchTag = tag => {
    const queryTag = replace(tag, new RegExp(/#/, "g"), "");
    router.push(`${PATHS.searchRallyResult}?tag=${queryTag}`);
  };

  return (
    <>
      <div className={styles.rally}>
        <div className={styles.rallyContent}>
          <div className={styles.rallyTitle}>
            <p className={styles.title}>{game?.name}</p>
          </div>
          <div className={styles.tags}>
            {game?.tag_list?.map(tag => {
              return (
                <span
                  className={styles.tag}
                  key={tag + Math.random()}
                  onClick={() => goSearchTag(tag)}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          <div className={styles.shareWrapper}>
            <div className={styles.reaction}>
              <div className={styles.reactionItem}>
                <img
                  className={styles.reactionIcon}
                  src="/icons/ic-participation.svg"
                  alt="icon"
                />
                <span className={styles.reactionLabel}>
                  {game?.number_of_players}
                </span>
              </div>
              <div className={styles.reactionItem}>
                <img
                  className={styles.reactionIcon}
                  src="/icons/ic-read.svg"
                  alt="icon"
                />
                <span className={styles.reactionLabel}>
                  {game?.number_of_checked_in}
                </span>
              </div>
              <div className={styles.reactionItem}>
                <img
                  className={styles.reactionIcon}
                  src="/icons/ic-un-like.svg"
                  alt="icon"
                />
                <span className={styles.reactionLabel}>
                  {game?.number_of_favorites}
                </span>
              </div>
            </div>
            <div className={styles.share}>
              シェア
              <img
                src="/icons/ic-share.svg"
                alt="ic-share"
                className={styles.icShare}
              />
            </div>
          </div>
        </div>
        <div className={styles.rallyImage}>
          <img
            src={game?.top_photo_url || game?.google_image_url || bannerDefault}
            alt="img-rally"
          />
          <div className={styles.userInfo}>
            <div className={styles.avt}>
              <img src={auth.user.avatar_url || avatarDefault} alt="avt" />
            </div>
            <div className={styles.userName}>{auth?.user?.user_name}</div>
            <div className={styles.follow}>フォローする</div>
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.menuItem}>ラリー詳細</div>
        <div className={styles.menuItem}>ラリートップ</div>
        <div className={styles.menuItem}>ランキング</div>
        <div className={styles.menuItem}>レビュー</div>
      </div>
    </>
  );
};

export default RallyInfo;

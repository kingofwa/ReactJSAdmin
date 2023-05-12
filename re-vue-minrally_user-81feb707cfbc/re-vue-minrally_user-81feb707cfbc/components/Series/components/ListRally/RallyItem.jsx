import PATHS from "@config/paths";
import { Col } from "antd";
import { replace } from "lodash";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const RallyItem = ({ rally, index, handleFavoriteGame }) => {
  const router = useRouter();

  const goToPage = id => {
    router.push(`${PATHS.rally}/${id}`);
  };

  const goSearchTag = tag => {
    const queryTag = replace(tag, new RegExp(/#/, "g"), "");
    router.push(`${PATHS.searchRallyResult}?tag=${queryTag}`);
  };

  return (
    <>
      <div className={styles.rallyItem} key={index}>
        <Col>
          {rally?.is_finished && (
            <span className={styles.finished}>
              完<br />走
            </span>
          )}
        </Col>
        <Col span={20}>
          <div className={styles.rallyContent}>
            <div className={styles.tagList}>
              {rally?.tag_list?.map(item => (
                <span
                  className={styles.tagItem}
                  key={item + Math.random()}
                  onClick={() => goSearchTag(item)}
                >
                  {item}
                </span>
              ))}
            </div>
            <div
              className={styles.rallyTitleInfo}
              onClick={() => goToPage(rally?.id)}
            >
              <p className={styles.rallyTitle}>{rally?.name}</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomItem}>
              <img src="/img/mypage/people.svg" alt="people" />
              <span>{rally?.number_of_players}</span>
            </div>
            <div className={styles.bottomItem}>
              <img src="/img/mypage/check.png" alt="check" />
              <span>{rally.number_of_checked_in}</span>
            </div>
            <div
              className={`${styles.bottomItem} ${styles.favorite}`}
              onClick={() => {
                handleFavoriteGame(rally.is_favorite, rally.id);
              }}
            >
              {/* <img src="/img/mypage/heart.png" alt="heart" /> */}
              {rally?.is_favorite ? (
                <img src="/img/profile/like.svg" alt="like" />
              ) : (
                <img src="/img/mypage/heart.png" alt="unlike" />
              )}
              <span>{rally?.number_of_favorites}</span>
            </div>
          </div>
        </Col>
        {/* <div onClick={() => goToPage(rally?.id)} className={styles.goDetail}>
          <img
            src="/icons/ic-go-detail.svg"
            alt="ic-go-detail"
            className={styles.icGoDetail}
          />
        </div> */}
      </div>
    </>
  );
};

export default RallyItem;

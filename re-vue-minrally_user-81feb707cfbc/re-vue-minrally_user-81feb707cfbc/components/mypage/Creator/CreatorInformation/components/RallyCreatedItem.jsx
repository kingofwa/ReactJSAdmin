import PATHS from "@config/paths";
import { DATE_DOT } from "@utils/date";
import { Col, Row, Tooltip } from "antd";
import moment from "moment-timezone";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../style.module.scss";

const RallyCreatedItem = ({
  item,
  handleFavoriteSeri,
  handleUnFavoriteSeri,
  handleDeleteTrash
}) => {
  const router = useRouter();

  const goToDetail = () => {
    router.push({
      pathname: PATHS.series,
      query: {
        id: item.id
      }
    });
  };
  const handleFavorite = () => {
    return item?.is_favorite
      ? handleUnFavoriteSeri(item?.id)
      : handleFavoriteSeri(item?.id);
  };

  const onDeleteDraft = async () => {
    handleDeleteTrash(item.id);
  };

  const content = (
    <button type="button" className={styles.textDeleteDraft} onClick={onDeleteDraft} key={item.id}>削除する</button>
  );
  return (
    <Row className={styles.rallyItem}>
      <Col span={20} className={styles.content}>
        <div className={styles.top}>
          <img
            src="/icons/ic-copy.svg"
            alt="ic-copy"
            className={styles.icCopy}
          />
          <div className={styles.title} onClick={goToDetail}>
            {item?.name}
          </div>
        </div>
        <div className={styles.mid}>
          {item?.published_at && (
            <div>
              公開日
              <span>
                {item?.published_at
                  ? moment(item?.published_at).tz("Asia/Tokyo").format(DATE_DOT)
                  : "-"}
              </span>
            </div>
          )}
          {item?.updated_at && (
            <div>
              更新日
              <span>
                {item?.updated_at
                  ? moment(item?.updated_at).tz("Asia/Tokyo").format(DATE_DOT)
                  : ""}
              </span>
            </div>
          )}
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomItem}>
            <img src="/img/mypage/people.svg" alt="people" />
            <span className={styles.bottomItemText}>
              {item?.number_of_players}
            </span>
          </div>
          <div className={styles.bottomItem}>
            <img src="/img/mypage/check.png" alt="check" />
            <span className={styles.bottomItemText}>
              {item.number_of_checked_in}
            </span>
          </div>
          <div className={styles.bottomItem} onClick={handleFavorite}>
            <img
              src={
                item?.is_favorite
                  ? "/icons/ic-like.svg"
                  : "/icons/ic-un-like.svg"
              }
              alt="heart"
            />
            <span className={styles.bottomItemText}>
              {item?.number_of_favorites}
            </span>
          </div>
        </div>
      </Col>
      <Col span={4} className={styles.action}>
        <Link href={{ pathname: PATHS.editSerie, query: { id: item.id } }}>
          <a className={styles.btnEdit}>編 集</a>
        </Link>
        {(item.number_of_players === 0 || item.published_at === null) && (
          <Tooltip placement="left" title={content} trigger="click" overlayClassName={`${styles.TooltipContain}`} color="white" overlayInnerStyle={{ 'border-radius': '6px' }}>
            <div className={styles.deleteTrash}>
              <img
                className={styles.iconTrash}
                alt="ic"
                src="/icons/ic-trash.svg"
              />
            </div>
          </Tooltip>
        )}
      </Col>
    </Row>
  );
};

export default RallyCreatedItem;

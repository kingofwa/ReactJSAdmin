import PATHS from "@config/paths";
import { DATE_DOT } from "@utils/date";
import { Button, Col, Row, Tooltip } from "antd";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import styles from "../style.module.scss";

const RallyPlayingItem = ({
  item,
  handleFavoriteRally,
  handleUnfavoriteRally,
  handleDeleteTrash
}) => {
  const router = useRouter();

  const goToPage = () => {
    if (item.status === "published") {
      router.push(`${PATHS.rally}/${item?.id}`);
    } else {
      const url = PATHS.rallyEditInfo.replace(/:rallyId/, item?.id);
      router.push(url);
    }
  };

  const onEdit = () => {
    // if (item.status !== "published") {
    const url = PATHS.rallyEditInfo.replace(/:rallyId/, item?.id);
    router.push(url);
    // }
  };

  const handleFavorite = () => {
    return item?.is_favorite
      ? handleUnfavoriteRally(item.id)
      : handleFavoriteRally(item.id);
  };

  const onDeleteDraft = async () => {
    handleDeleteTrash(item.id);
  };

  const content = (
    <button type="button" className={styles.textDeleteDraft} onClick={onDeleteDraft} key={item.id}>下書きを削除する</button>
  );

  return (
    <Row className={styles.rallyItem}>
      <Col span={20} className={styles.content}>
        <div className={styles.top}>
          {item.status !== "published" ? (
            <Button className={styles.btnDraft}>下書き</Button>
          ) : (
            <Button className={styles.btnRelease}>公開</Button>
          )}

          <div className={styles.title} onClick={goToPage}>
            {item?.name}
          </div>
        </div>
        <div className={styles.mid}>
          {item?.published_at && (
            <div>
              公開日
              <span>
                {moment(item?.published_at).tz("Asia/Tokyo").format(DATE_DOT)}
              </span>
            </div>
          )}

          {item?.updated_at && (
            <div>
              更新日
              <span>
                {item?.updated_at
                  ? moment(item?.updated_at).tz("Asia/Tokyo").format(DATE_DOT)
                  : "-"}
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
                !item?.is_favorite
                  ? "/icons/ic-un-like.svg"
                  : "/icons/ic-like.svg"
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
        <Button
          // disabled={item.status === "published"}
          className={styles.btnEdit}
          onClick={onEdit}
        >
          編 集
        </Button>
        {item.status === "draft" && (
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

export default RallyPlayingItem;

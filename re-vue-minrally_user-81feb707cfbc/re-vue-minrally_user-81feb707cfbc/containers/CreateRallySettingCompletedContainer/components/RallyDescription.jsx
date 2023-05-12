/* eslint-disable import/no-unresolved */
import YoutubeIframe from "@components/common/youtube/YoutubeIframe";
import { getIdYouTuBe } from "@utils/get-id-youtube";
import { size } from "lodash";
import styles from "./RallyDescription.module.scss";

const RallyDescription = ({ game }) => {
  return (
    <>
      <div className={styles.rallyDescription}>
        <div className={styles.rowTitle}>
          <p className={styles.title}>ラリー説明</p>
        </div>
        <div className={styles.content}>{game?.description}</div>
      </div>

      {size(game?.youtube_video_list) > 0 && (
        <div className={styles.rallyDescription}>
          <div className={styles.rowTitle}>
            <p className={styles.title}>動画</p>
          </div>
          <div className={styles.content}>
            {game?.youtube_video_list?.map(item => {
              const embedId = getIdYouTuBe(item);
              return <YoutubeIframe embedId={embedId} />;
            })}
          </div>
        </div>
      )}

      {size(game?.related_links) > 0 && (
        <div className={styles.rallyDescription}>
          <div className={styles.rowTitle}>
            <p className={styles.title}>関連リンク</p>
          </div>
          <div className={styles.content}>
            {game?.related_links?.map(item => (
              <div className={styles.relatedLink}>{item.name}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RallyDescription;

import TopList from "@components/TopList";
import { useState, useEffect } from "react";
import { getProfileSeries, getProfileSeriesDetail } from "@services/profile";
import { message } from "antd";
import { TOP_TYPE } from "@config/constants";
import SeriesDescription from "./elements/SeriesDescription/SeriesDescription";
import styles from "./SeriesContainer.module.scss";

const SeriesContainer = ({ profileId, seriesId }) => {
  const [pagination, setPagination] = useState({ page: 0, total: 0 });
  const [series, setSeries] = useState([]);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProfileSeries(profileId, { page: 1, per: 10 });
      setPagination({ page: 1, total: data.total });
      setSeries(data.items);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const data = await getProfileSeries(profileId, {
        page: pagination.page + 1,
        per: 10
      });
      setPagination({ ...pagination, page: pagination.page + 1 });
      setSeries([...series, ...data.items]);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeriesDetail = async () => {
    try {
      setLoading(true);
      const data = await getProfileSeriesDetail(profileId, seriesId);
      setDetail(data);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileId && seriesId) {
      fetchSeriesDetail();
    }
  }, [profileId, seriesId]);

  useEffect(() => {
    if (profileId) {
      fetchData();
    }
  }, [profileId]);

  const renderSeriesInfo = () => {
    return (
      <div className={styles.series}>
        <div className={styles.seriesContent}>
          <div className={styles.seriesTitle}>
            <img
              src="/icons/ic-copy.svg"
              alt="ic-copy"
              className={styles.icCopy}
            />
            <p className={styles.title}>{detail?.name}</p>
          </div>
          {/* <div className={styles.tags}>
            {detail?.tag_list.map(tag => {
              return (
                <span className={styles.tag} key={tag + Math.random()}>
                  #{tag}
                </span>
              );
            })}
          </div> */}

          <div className={styles.shareWrapper}>
            <div className={styles.reaction}>
              <div className={styles.reactionItem}>
                <img
                  className={styles.reactionIcon}
                  src="/icons/ic-participation.svg"
                  alt="icon"
                />
                <span className={styles.reactionLabel}>200</span>
              </div>
              <div className={styles.reactionItem}>
                <img
                  className={styles.reactionIcon}
                  src="/icons/ic-read.svg"
                  alt="icon"
                />
                <span className={styles.reactionLabel}>200</span>
              </div>
              <div className={styles.reactionItem}>
                <img
                  className={styles.reactionIcon}
                  src="/icons/ic-un-like.svg"
                  alt="icon"
                />
                <span className={styles.reactionLabel}>200</span>
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
        <div className={styles.userInfo}>
          <div className={styles.avt}>
            <img src="/img/avatar-holder.svg" alt="avt" />
          </div>
          <div className={styles.userName}>クリエイター名</div>
          <div className={styles.follow}>フォローする</div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderSeriesInfo()}
      <SeriesDescription
        title="グランドラリー説明"
        description={detail?.description}
      />
      <TopList
        items={series}
        fetchMoreData={fetchMoreData}
        pagination={pagination}
        type={TOP_TYPE.GAME}
      />
    </>
  );
};

export default SeriesContainer;

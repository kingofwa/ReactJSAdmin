import { useState } from "react";
import moment from "moment";
import InfiniteScrollList from "@components/common/infinite-scroll-list";
import { DATE_DEFAULT } from "@utils/date";
import { TOP_TYPE } from "@config/constants";
import { useRouter } from "next/router";
import PATHS from "@config/paths";
import { replace } from "lodash";
import styles from "./TopList.module.scss";

const ListLayout = [
  {
    key: "single",
    icon: "/icons/ic-single.png",
    iconActive: "/icons/ic-single-active.png",
    layout: styles.single
  },
  {
    key: "grid",
    icon: "/icons/ic-grid.png",
    iconActive: "/icons/ic-grid-active.png",
    layout: styles.grid
  },
  {
    key: "list",
    icon: "/icons/ic-list.png",
    iconActive: "/icons/ic-list-active.png",
    layout: styles.list
  }
];

const TopList = ({ items, fetchMoreData, pagination, type }) => {
  const [isActive, setIsActive] = useState(ListLayout[0]?.key);
  const [layout, setLayout] = useState(ListLayout[0]?.layout);
  const router = useRouter();

  const goDetail = id => {
    if (type === TOP_TYPE.GAME) {
      router.push(`${PATHS.rally}/${id}`);
    }
  };

  const goProfile = id => {
    router.push(PATHS.profilePlayerRally.replace(/\[id\]/, id));
  };

  const goSearchTag = tag => {
    const queryTag = replace(tag, new RegExp(/#/, "g"), "");
    router.push(`${PATHS.searchRallyResult}?tag=${queryTag}`);
  };

  const renderCard = item => {
    const date = moment(item?.updated_at).format(DATE_DEFAULT);
    return (
      <div className={styles.card}>
        <div className={styles.image} onClick={() => goDetail(item?.id)}>
          <img
            src={item?.top_photo_url || "/img/placeholder-image.png"}
            alt="card-img"
          />
          {item?.pr && <span className={styles.pr}>PR</span>}
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.info}>
          <div className={styles.tags}>
            {item?.tag_list?.map(tag => {
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
          <div className={styles.title} onClick={() => goDetail(item?.id)}>
            {item?.name}
          </div>
          <div className={styles.reaction}>
            <div className={styles.reactionItem}>
              <img
                className={styles.reactionIcon}
                src="/icons/ic-participation.svg"
                alt="icon"
              />
              <span className={styles.reactionLabel}>
                {item?.number_of_checked_in}
              </span>
            </div>
            <div className={styles.reactionItem}>
              <img
                className={styles.reactionIcon}
                src="/icons/ic-read.svg"
                alt="icon"
              />
              <span className={styles.reactionLabel}>
                {item?.number_of_players}
              </span>
            </div>
            <div className={styles.reactionItem}>
              <img
                className={styles.reactionIcon}
                src="/icons/ic-un-like.svg"
                alt="icon"
              />
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
                  src={item?.avatar_url || "/img/avatar-holder.svg"}
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
            <span className={styles.listDate}>{date}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderListLayout = () => {
    return (
      <div className={styles.switching}>
        <span className={styles.label}>表示切替</span>

        {ListLayout.map(item => {
          const active = item.key === isActive;
          return (
            <div
              key={item.key}
              className={styles.icon}
              onClick={() => {
                setIsActive(item.key);
                setLayout(item.layout);
              }}
            >
              <img src={active ? item.iconActive : item.icon} alt="ic-layout" />
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <div className={styles.container}>
        {renderListLayout()}
        <div className={layout}>
          <InfiniteScrollList
            data={items}
            total={pagination.total}
            fetcher={fetchMoreData}
            renderItem={item => renderCard(item)}
          />
        </div>
      </div>
    </>
  );
};

export default TopList;

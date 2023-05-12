import { useState } from "react";
import styles from "./MinrallyList.module.scss";

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

const Minrallylist = () => {
  const [isActive, setIsActive] = useState(ListLayout[0]?.key);
  const [layout, setLayout] = useState(ListLayout[0]?.layout);

  const renderCard = () => {
    return (
      <div className={styles.card}>
        <div className={styles.image}>
          <img src="/img/ramen.jpeg" alt="card-img" />
          <span className={styles.pr}>PR</span>
          <span className={styles.date}>2022.00.00 UP</span>
        </div>
        <div className={styles.info}>
          <div className={styles.tags}>
            <span className={styles.tag}>#カテゴリー名</span>
            <span className={styles.tag}>#カテゴリー名</span>
            <span className={styles.tag}>#カテゴリー名</span>
          </div>
          <p className={styles.title}>ラリー名ラリー名ラリー名</p>
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
                src="/icons/ic-like.svg"
                alt="icon"
              />
              <span className={styles.reactionLabel}>200</span>
            </div>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.user}>
              <div className={styles.avatar}>
                <img src="/img/avatar-holder.svg" alt="avatar" />
              </div>
              <span className={styles.userName}>
                クリエイター名クリエイター名
              </span>
            </div>
            <span className={styles.listDate}>2022.00.00 U</span>
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
          {renderCard()}
          {renderCard()}
          {renderCard()}
          {renderCard()}
          {renderCard()}
          {renderCard()}
          {renderCard()}
          {renderCard()}
        </div>
      </div>
    </>
  );
};

export default Minrallylist;

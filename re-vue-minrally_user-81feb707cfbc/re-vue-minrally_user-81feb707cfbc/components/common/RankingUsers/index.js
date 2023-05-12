import { Skeleton } from "antd";
import Link from "next/link";
import { useState } from "react";
import TooltipModal from "../modal/TooltipModal";
import RankingUserItem from "./RankingUserItem";
import styles from "./styles.module.scss";

// Default tooltip - Common
const RankingUsers = ({
  users,
  type,
  path,
  isDetail,
  title,
  content,
  role,
  currentUserId,
  showMe,
  isLoading,
  page,
  isShowDetail
}) => {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const renderContent = () => {
    if (isLoading && page === 1) {
      return <Skeleton />;
    }
    return (
      <>
        {users?.map((user, index) => {
          const isCurrentUser = currentUserId === user?.id;
          const isShowUser = isCurrentUser && showMe;
          return (
            <div id={isCurrentUser ? "current-user" : ""}>
              <RankingUserItem
                key={user?.id}
                user={user}
                rank={index + 1}
                type={type}
                role={role}
                isShowUser={isShowUser}
              />
            </div>
          );
        })}
        <TooltipModal
          visible={isOpenTooltip}
          hideModal={() => setIsOpenTooltip(false)}
        >
          <div className={styles.titleTooltip}>{title}</div>
          <br />
          <br />
          {content}
        </TooltipModal>
      </>
    );
  };

  return (
    <>
      <div className={styles.userList} id="containerRankingUser">
        {isDetail ? (
          ""
        ) : (
          <div className={styles.info}>
            <p className={styles.title}>
              {title}
              <span onClick={() => setIsOpenTooltip(true)}>
                <img
                  src="/icons/ic-info.svg"
                  alt="ic-info"
                  className={styles.icInfo}
                />
              </span>
            </p>
            {isShowDetail && (
              <Link href={path}>
                <a className={styles.seeMore}>もっと見る</a>
              </Link>
            )}
          </div>
        )}
        {renderContent()}
        {/* 
        {users?.map((user, index) => {
          const isCurrentUser = currentUserId === user?.id;
          const isShowUser = isCurrentUser && showMe;
          return (
            <div id={isCurrentUser ? "current-user" : ""}>
              <RankingUserItem
                key={user?.id}
                user={user}
                rank={index + 1}
                type={type}
                role={role}
                isShowUser={isShowUser}
              />
            </div>
          );
        })}
        <TooltipModal
          visible={isOpenTooltip}
          hideModal={() => setIsOpenTooltip(false)}
        >
          <div className={styles.titleTooltip}>{title}</div>
          <br />
          <br />
          {content}
        </TooltipModal> */}
      </div>
    </>
  );
};

export default RankingUsers;

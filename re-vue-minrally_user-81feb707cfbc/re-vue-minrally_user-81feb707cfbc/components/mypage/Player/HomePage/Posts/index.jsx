import { getUserActivities } from "@components/mypage/service";
import { Skeleton } from "antd";
import { isEmpty, map } from "lodash";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PATHS from "@config/paths";
import { useRouter } from "next/router";
import CouponBtn from "@components/Coupon/CouponBtn";
import { useAuth } from "@contexts/auth";
import PostItem from "./PostItem";
import styles from "./style.module.scss";
// TODO: fake data checkinHistory

const PostList = () => {
  // const array = [1, 2, 3, 4, 5];
  const [pagination, setPagination] = useState({ page: 0, total: 0 });
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const router = useRouter();
  const auth = useAuth();

  const fetchPlayerActivities = async () => {
    try {
      if (isFirstPage) {
        setIsLoading(true);
      }
      const response = await getUserActivities({ page: 1, per: 10 });
      setPagination({ page: 1, total: response.total });
      setActivities(response.items);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
      setIsFirstPage(false);
    }
  };

  const fetchMorePlayerActivities = async () => {
    try {
      const response = await getUserActivities({
        page: pagination.page + 1,
        per: 10
      });
      setPagination({ page: pagination.page + 1, total: response.total });
      setActivities([...activities, ...response.items]);
    } catch (error) {
      //
    }
  };

  const goBannerActivity = link => {
    router.push(link);
  };

  useState(() => {
    fetchPlayerActivities();
  }, []);

  const renderNoActivity = () => {
    const listBanner = [
      {
        id: 1,
        img: "/img/no-activity/no-activity-1.png",
        link: PATHS.searchRally
      },
      {
        id: 2,
        img: "/img/no-activity/no-activity-2.png",
        link: PATHS.searchCreator
      },
      { id: 3, img: "/img/no-activity/no-activity-3.png", link: PATHS.faq }
    ];
    return (
      <div>
        <div className={styles.noData}>
          みんラリに登録ありがとうございます！
          <br />
          <br />
          はじめに、<b>ラリーのいいね</b> や<br />
          <b>ラリマスのフォロー</b>をしてみよう！
        </div>
        <div className={styles.listBanner}>
          {map(listBanner, item => (
            <div
              key={item?.id}
              className={styles.bannerItem}
              onClick={() => goBannerActivity(item?.link)}
            >
              <img src={item?.img} alt="activity" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCouponBtn = () => {
    if (auth?.user?.has_coupon_rewards) {
      return (
        <CouponBtn
          onClick={() => {
            router.push(PATHS.myPageCoupon);
          }}
        />
      );
    }
    return null;
  };

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton />;
    }
    if (isEmpty(activities)) {
      return renderNoActivity();
    }
    return (
      <>
        <InfiniteScroll
          dataLength={activities?.length}
          next={fetchMorePlayerActivities}
          hasMore={activities.length < pagination.total}
          loader={<Skeleton paragraph={{ row: 1 }} active />}
        >
          <div className={styles.historyList}>
            {renderCouponBtn()}
            {activities?.map(item => (
              <PostItem item={item} key={item?.id} />
            ))}
          </div>
        </InfiniteScroll>
      </>
    );
  };

  return (
    <>
      <div className={styles.history}>{renderContent()}</div>
    </>
  );
};

export default PostList;

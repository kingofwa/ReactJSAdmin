import { useEffect, useState, useContext } from "react";
import {
  getNotifications
  // readAllNotifications
} from "@services/notifications";
import { Skeleton } from "antd";
import { LoaderContext } from "@contexts/loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { findIndex, map } from "lodash";
import SystemNotification from "@components/Notifications/SystemNotification";
// import { NotificationContext } from "@contexts/notification";
import styles from "./styles.module.scss";

// const { Text } = Typography;

const NewsContainer = () => {
  const [notifications, setNotifications] = useState([]);
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  // const { checkNotifications } = useContext(NotificationContext);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const fetchNotifications = () => {
    showLoadingAnim();
    const params = { page: 1, per: 10 };
    getNotifications(params)
      .then(res => {
        setNotifications(res.data);
        setTotal(res.meta.count);
        setPage(res.meta.next);
      })
      .finally(hideLoadingAnim());
  };

  const fetchMoreNotifications = async () => {
    try {
      // showLoadingAnim();
      const params = { page, per: 10 };
      const res = await getNotifications(params);
      setNotifications([...notifications, ...res.data]);
      setTotal(res.meta.count);
      setPage(res.meta.next);
    } catch (error) {
      //
    } finally {
      // hideLoadingAnim();
    }
  };

  // const handleReadAllNotification = async () => {
  //   try {
  //     await readAllNotifications();
  //     fetchNotifications();
  //     checkNotifications();
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  const onUpdateNotice = id => {
    const newNotices = [...notifications];
    const itemIndex = findIndex(newNotices, { id });
    newNotices[itemIndex] = {
      ...newNotices[itemIndex],
      is_viewed: true,
      is_collapse: !newNotices[itemIndex]?.is_collapse
    };
    setNotifications(newNotices);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // const menu = (
  //   <Menu className={styles.btnFixed}>
  //     <Menu.Item
  //       onClick={handleReadAllNotification}
  //       className={styles.textReadAll}
  //     >
  //       重要なお知らせ以外をすべて既読にする
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <>
      {/* {notifications?.length > 0 && (
        <Row justify="end" className={styles.boxWrapper}>
          <div className={styles.boxFixed}>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              getPopupContainer={trigger => trigger.parentNode}
              placement="bottomRight"
            >
              <Text className={styles.btnReadAll}>すべて既読にする</Text>
            </Dropdown>
          </div>
        </Row>
      )} */}
      <InfiniteScroll
        dataLength={notifications?.length}
        next={fetchMoreNotifications}
        hasMore={notifications?.length < total}
        loader={<Skeleton paragraph={{ row: 1 }} active />}
        // scrollableTarget="scrollableDiv"
      >
        <div className={styles.newsList}>
          {map(notifications, item => (
            <SystemNotification
              item={item}
              onUpdateNotice={id => onUpdateNotice(id)}
              key={item + Math.random()}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default NewsContainer;

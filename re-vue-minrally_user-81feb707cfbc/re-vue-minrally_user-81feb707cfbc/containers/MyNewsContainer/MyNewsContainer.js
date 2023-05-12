import { useEffect, useState, useContext } from "react";
import {
  getUserNotifications,
  readAllUserNotifications
} from "@services/notifications";
import { Row, Col, Select, Skeleton, Menu, Dropdown, Typography } from "antd";
import { LoaderContext } from "@contexts/loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { findIndex, map } from "lodash";
import { NOTIFICATION_TYPE } from "@config/constants";
import UserNotification from "@components/Notifications/UserNotification";
import { NotificationContext } from "@contexts/notification";
import styles from "./MyNewsContainer.module.scss";

const { Text } = Typography;

export const FILTER = [
  { value: NOTIFICATION_TYPE.ALL, name: "すべて" },
  { value: NOTIFICATION_TYPE.PLAYER, name: "プレイヤー" },
  { value: NOTIFICATION_TYPE.RALLY_MASTER, name: "ラリーマスター" },
  { value: NOTIFICATION_TYPE.OTHER, name: "重要" }
];

const MyNewsContainer = () => {
  const { Option } = Select;
  const [notifications, setNotifications] = useState([]);
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const { checkNotifications } = useContext(NotificationContext);
  const [kind, setKind] = useState(NOTIFICATION_TYPE.ALL);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const fetchNotifications = async value => {
    try {
      showLoadingAnim();
      const params = { page: 1, per: 10, kind: value };
      const res = await getUserNotifications(params);
      setNotifications(res.data);
      setTotal(res.meta.count);
      setPage(res.meta.next);
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  const readAllMyNotifications = async () => {
    try {
      await readAllUserNotifications();
      fetchNotifications(kind);
      checkNotifications();
    } catch (error) {
      // console.warn(error);
    }
  };
  const menu = (
    <Menu className={styles.btnFixed}>
      <Menu.Item
        onClick={readAllMyNotifications}
        className={styles.textReadAll}
      >
        重要なお知らせ以外をすべて既読にする
      </Menu.Item>
    </Menu>
  );

  const fetchMoreNotifications = async () => {
    try {
      // showLoadingAnim();
      const params = { page, per: 10, kind };
      const res = await getUserNotifications(params);
      setNotifications([...notifications, ...res.data]);
      setTotal(res.meta.count);
      setPage(res.meta.next);
    } catch (error) {
      //
    } finally {
      // hideLoadingAnim();
    }
  };

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

  const handleChangeKind = async value => {
    setKind(value);
    fetchNotifications(value);
  };

  useEffect(() => {
    fetchNotifications(NOTIFICATION_TYPE.ALL);
  }, []);

  return (
    <>
      <div className={styles.select}>
        <div className={styles.boxFixed}>
          <Row className={styles.boxFixedBackground}>
            <Col span={24}>
              <div className={styles.background}>
                <Select
                  defaultValue={{ value: NOTIFICATION_TYPE.ALL }}
                  className={styles.rallySelect}
                  onChange={handleChangeKind}
                  value={kind}
                >
                  {map(FILTER, item => (
                    <Option value={item?.value} key={item + Math.random()}>
                      {item?.name}
                    </Option>
                  ))}
                </Select>
                {notifications?.length > 0 && (
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    getPopupContainer={trigger => trigger.parentNode}
                    placement="bottomRight"
                  >
                    <Text className={styles.btnReadAll}>すべて既読にする</Text>
                  </Dropdown>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <InfiniteScroll
        dataLength={notifications?.length}
        next={fetchMoreNotifications}
        hasMore={notifications?.length < total}
        loader={<Skeleton paragraph={{ row: 1 }} active />}
        // scrollableTarget="scrollableDiv"
      >
        <div className={styles.newsList}>
          {map(notifications, item => (
            <UserNotification
              item={item}
              key={item + Math.random()}
              onUpdateNotice={id => onUpdateNotice(id)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default MyNewsContainer;

/* eslint-disable camelcase */
import PATHS from "@config/paths";
import { DATE_DOT } from "@utils/date";
import { List } from "antd";
import { isEmpty } from "lodash";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import styles from "./Styles.module.scss";

const ListCoupon = ({
  title = "",
  data,
  meta,
  handleChangePage,
  loading,
  showRallyName,
  showReceivedName
}) => {
  const router = useRouter();

  const goCouponDetail = id => {
    router.push({
      pathname: PATHS.couponDetail,
      query: { id }
    });
  };

  const renderCouponItem = item => {
    const {
      name,
      is_available,
      id,
      created_at,
      expiration_date,
      is_expired,
      times_of_used,
      game_name,
      serie_name,
      received_from_name
    } = item;
    const createdAt = moment(created_at).tz("Asia/Tokyo").format(DATE_DOT);
    const expiration = moment(expiration_date)
      .tz("Asia/Tokyo")
      .format(DATE_DOT);

    return (
      <div className={styles.CouponItem} key={id}>
        <div className={styles.CouponHeader} onClick={() => goCouponDetail(id)}>
          <div
            className={
              is_available ? styles.CouponStatus : styles.CouponStatusInactive
            }
          >
            {times_of_used > 1 ? "利用済" : "未利用"}
          </div>
          <div className={styles.CouponTile}>{name}</div>
        </div>
        {showRallyName && (
          <div className={styles.CouponDesc}>{game_name || serie_name}</div>
        )}
        {showReceivedName && (
          <div className={styles.CouponDesc}>{received_from_name}</div>
        )}
        <div className={styles.CouponDate}>
          <span>獲得日：{createdAt}</span>
          {is_expired ? (
            <span className={styles.CouponDateExpired}>
              利用期限が切れました
            </span>
          ) : (
            <span>利用期限：{expiration}</span>
          )}
        </div>
      </div>
    );
  };

  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className={styles.ListCoupon}>
      <div className={styles.Title}>{title}</div>
      <List
        itemLayout="vertical"
        pagination={{
          pageSize: 5,
          total: meta?.count,
          showSizeChanger: false,
          onChange: page => handleChangePage(page)
        }}
        dataSource={data}
        renderItem={item => renderCouponItem(item)}
        loading={loading}
      />
    </div>
  );
};

export default ListCoupon;

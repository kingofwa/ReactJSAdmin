import { CustomButton } from "@components/common/buttons";
import PATHS from "@config/paths";
import { Modal, Row } from "antd";
import { random } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const CouponCheckInModal = ({
  visible,
  onClose = () => {},
  spotData,
  couponData
}) => {
  const icDone = [
    "329408978_909358523747526_8852092449694589216_n.gif",
    "icon-2.gif"
  ];
  const [iconIndex, setIconIndex] = useState();
  const router = useRouter();

  // const couponData = {
  //   id: "e1ad696b-8a8b-49af-accb-d64d055b9f61",
  //   name: "その雑誌を読むと",
  //   description:
  //     "やっぱり星だとジョバンニは思いましたが、カムパネルラともあんまり物を言わないようになったので、カムパネルラともあんまり物を言わないようになったので、それから四、五人手をあげました。,それをカムパネルラが忘れるはずもなかったのに、いつか雑誌で読んだのでしたが、そして教室じゅうはしばらく机の蓋をあけたりしめたり本を重ねたりする音がいっぱいでしたが、ジョバンニを見てくすっとわらいました。,するとあ...",
  //   image_url:
  //     "http://dev.minrally.local/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9JYTJWNVNTSWhaM3BwZW1ocmJtVjRNMmx5WWpZM2EzTnVabkZ5YkhCMmFYTXlOUVk2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpUVdsdWJHbHVaVHNnWm1sc1pXNWhiV1U5SWpNMk5qSTNOelF1YW5Cbklqc2dabWxzWlc1aGJXVXFQVlZVUmkwNEp5Y3pOall5TnpjMExtcHdad1k3QmxRNkVXTnZiblJsYm5SZmRIbHdaVWtpRDJsdFlXZGxMMnB3WldjR093WlVPaEZ6WlhKMmFXTmxYMjVoYldVNkNteHZZMkZzIiwiZXhwIjoiMjAyMy0wMy0xOFQxMDowNjo0MC42MDNaIiwicHVyIjoiYmxvYl9rZXkifX0=--fa9b04bd7102dfdaca2e112fc974d5ee8e6f5f41/3662774.jpg",
  //   received_from_type: "Game",
  //   received_from_id: "f3397768-1955-4ac6-ac75-f8239e388040",
  //   received_from_name: "Kanagawa",
  //   limit_number_of_times_of_use_per_sheet: 8,
  //   created_at: "2023-03-16T19:06:40.495+09:00",
  //   expiration_date: "2023-03-22T23:59:59.999+09:00"
  // };

  const onGoCouponDetail = () => {
    router.push({
      pathname: PATHS.couponDetail,
      query: { id: couponData?.id }
    });
  };

  useEffect(() => {
    const index = random(0, 1);
    setIconIndex(index);
  }, [visible]);

  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.checkInModal}
        visible={visible}
        onCancel={onClose}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
      >
        <Row className={styles.description}>{spotData?.rallyName}</Row>
        <Row className={styles.name}>{spotData?.name}</Row>
        <Row>
          <img
            className={styles.doneIcon}
            alt="ic"
            src={`/icons/${icDone[iconIndex]}`}
          />
        </Row>
        <Row className={styles.description}>
          チェックイン報酬を獲得しました！
        </Row>

        {couponData?.image_url && (
          <div className={styles.couponImage}>
            <img alt="coupon" src={couponData?.image_url} />
          </div>
        )}

        <div className={styles.btnGroup}>
          <CustomButton
            size="middle"
            variant="submit"
            className={styles.btnAction}
            onClick={onGoCouponDetail}
          >
            報酬を確認する
          </CustomButton>
        </div>
      </Modal>
    </div>
  );
};

export default CouponCheckInModal;

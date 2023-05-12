import { CustomButton } from "@components/common/buttons";
import { ERROR_MESSAGES } from "@config/messages";
import PATHS from "@config/paths";
import { message } from "antd";
import { map } from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./AreaSearch.module.scss";

const AreaSearch = ({ keyword, goSearchPrefecture }) => {
  const [collapse, setCollapse] = useState(true);
  // const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const onClickCollapse = () => {
    setCollapse(!collapse);
  };

  const areas = [
    {
      title: "北海道・東北地方",
      child: [
        "北海道",
        "青森県",
        "岩手県",
        "宮城県",
        "秋田県",
        "山形県",
        "福島県"
      ]
    },
    {
      title: "関東地方",
      child: [
        "茨城県",
        "栃木県",
        "群馬県",
        "埼玉県",
        "千葉県",
        "東京都",
        "神奈川県"
      ]
    },
    {
      title: "中部地方",
      child: [
        "新潟県",
        "富山県",
        "石川県",
        "福井県",
        "山梨県",
        "長野県",
        "岐阜県",
        "静岡県",
        "愛知県"
      ]
    },
    {
      title: "関西地方",
      child: [
        "三重県",
        "滋賀県",
        "京都府",
        "大阪府",
        "兵庫県",
        "奈良県",
        "和歌山県"
      ]
    },
    {
      title: "中国地方",
      child: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"]
    },
    {
      title: "四国地方",
      child: ["徳島県", "香川県", "愛媛県", "高知県"]
    },
    {
      title: "九州・沖縄地方",
      child: [
        "福岡県",
        "佐賀県",
        "長崎県",
        "熊本県",
        "大分県",
        "宮崎県",
        "鹿児島県",
        "沖縄県"
      ]
    }
  ];

  // const goResult = prefecture => {
  //   router.push(`${PATHS.searchRallyResult}?prefecture=${prefecture}`);
  // };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  const getPosition = pos => {
    const latitude = pos?.coords.latitude;
    const longitude = pos?.coords.longitude;
    if (latitude && longitude) {
      router.push(
        `${PATHS.searchRallyResult}?keyword=${keyword}&user_point_lat=${latitude}&user_point_lng=${longitude}`
      );
    }
  };

  const onBlockGetLocation = () => {
    message.error(ERROR_MESSAGES.blockLocation);
  };
  const goToRallyResultWithGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getPosition,
        onBlockGetLocation,
        options
      );
    } else {
      message.error(ERROR_MESSAGES.browserNotSupported);
    }
  };

  return (
    <>
      <div className={styles.contentItem}>
        <div className={styles.title} onClick={onClickCollapse}>
          <span>エリア検索</span>

          <>
            {collapse ? (
              <img
                src="/icons/ic-up.svg"
                alt="collapse"
                className={styles.collapseIcon}
              />
            ) : (
              <img
                src="/icons/ic-down.svg"
                alt="collapse"
                className={styles.collapseIcon}
              />
            )}
          </>
        </div>
        <CustomButton
          className={styles.btnSearchRally}
          onClick={goToRallyResultWithGps}
          variant="community"
        >
          現在地から探す
        </CustomButton>
        {collapse && (
          <>
            {map(areas, item => (
              <>
                <p className={styles.tagTitle}>{item.title}</p>
                <div className={styles.tags}>
                  {map(item.child, childItem => (
                    <span
                      className={styles.tag}
                      onClick={() => goSearchPrefecture(childItem)}
                    >
                      {childItem}
                    </span>
                  ))}
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default AreaSearch;

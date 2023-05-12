import { CustomButton } from "@components/common/buttons";
// import AcceptRally from "@components/LandingPage/components/AcceptRally";
import CheckinRally from "@components/LandingPage/components/CheckinRally";
import Companies from "@components/LandingPage/components/Companies";
import Guide from "@components/LandingPage/components/Guide";
import TopCoco from "@components/LandingPage/components/TopCoco";
import TopDefine from "@components/LandingPage/components/TopDefine";
import UserInfo from "@components/mypage/components/UserInfo";
import PostList from "@components/mypage/Player/HomePage/Posts";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import getSlider from "@services/slider";
import { message } from "antd";
import { size } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Slider from "./Slider";
import styles from "./style.module.scss";

const TopPageComponent = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [banners, setBanners] = useState([]);

  const auth = useAuth();

  const fetchBanner = async () => {
    try {
      const response = await getSlider();
      setBanners(response);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  useEffect(() => {
    if (auth.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [auth]);

  const hasBanner = size(banners) > 0;

  return (
    <div
      className={hasBanner ? styles.topContainerBanner : styles.topContainer}
    >
      <Slider data={banners} />

      {/* before login */}
      {!isLoggedIn && (
        <>
          <p className={styles.helpText}>
            新規登録・ログインをして
            <br />
            チェックインラリーの旅に出かけよう！
          </p>
          <CustomButton
            onClick={() => router.push(PATHS.login)}
            type="primary"
            className={styles.btnAction}
            variant="community"
          >
            新規登録・ログイン
          </CustomButton>
          <TopDefine isTop />
          <TopCoco isTop />
          <Guide isTop />
          <CheckinRally isTop />
          {/* <AcceptRally isTop /> */}
          <Companies isTop />
        </>
      )}

      {/* after login */}
      {isLoggedIn && (
        <>
          <UserInfo />
          <PostList />
        </>
      )}
    </div>
  );
};

export default TopPageComponent;

/* eslint-disable import/no-unresolved */
import CouponMyPageContainer from "@containers/CouponMyPageContainer";
import couponMyPageLayout from "layouts/coupon/coupon-mypage-layout";

const CouponMyPage = () => {
  return <CouponMyPageContainer />;
};

CouponMyPage.layout = couponMyPageLayout;

export default CouponMyPage;

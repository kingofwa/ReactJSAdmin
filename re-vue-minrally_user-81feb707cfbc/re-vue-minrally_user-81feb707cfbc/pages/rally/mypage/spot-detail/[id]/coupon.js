import SpotCouponContainer from "@containers/SpotCouponContainer";
import { getSpotDetail } from "@services/game";
import couponGrandLayout from "layouts/coupon/coupon-grand-layout";

const SpotCouponPage = ({ spotDetail, gameInfo }) => {
  return <SpotCouponContainer spotDetail={spotDetail} gameInfo={gameInfo} />;
};

SpotCouponPage.getInitialProps = async context => {
  const id = context?.query?.id;
  const response = await getSpotDetail(id);
  return { spotDetail: response?.data, gameInfo: response?.extra?.game };
};

SpotCouponPage.layout = couponGrandLayout;
export default SpotCouponPage;

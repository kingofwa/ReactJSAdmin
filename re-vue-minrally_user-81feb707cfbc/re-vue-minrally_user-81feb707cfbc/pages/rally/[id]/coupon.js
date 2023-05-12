import RallyCouponContainer from "@containers/RallyCouponContainer";
import { getDetailGame } from "@services/game";
import couponGrandLayout from "layouts/coupon/coupon-grand-layout";

const RallyCouponPage = ({ gameData }) => {
  return <RallyCouponContainer gameData={gameData} />;
};

RallyCouponPage.getInitialProps = async context => {
  const id = context?.query?.id;
  const response = await getDetailGame(id);
  return { gameData: response };
};

RallyCouponPage.layout = couponGrandLayout;
export default RallyCouponPage;

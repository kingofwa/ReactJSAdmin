import SeriesCouponContainer from "@containers/SeriesCouponContainer";
import { getSeriesDetail } from "@components/Series/services";
import couponGrandLayout from "layouts/coupon/coupon-grand-layout";

const SeriesCouponPage = ({ serieDetail }) => {
  return <SeriesCouponContainer serieDetail={serieDetail} />;
};

SeriesCouponPage.getInitialProps = async context => {
  const { id } = context?.query;
  const response = await getSeriesDetail(id);
  return { serieDetail: response, id };
};

SeriesCouponPage.layout = couponGrandLayout;
export default SeriesCouponPage;

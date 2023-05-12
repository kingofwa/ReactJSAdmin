import SeriReviewPage from "@components/Series/Review";
import OnlyFooterLayout from "layouts/only-footer-layout";
import { getSeriesDetail } from "@components/Series/services";
import HeadMeta from "@components/HeadMeta";

const SeriReview = ({ serieDetail, id }) => {
  return (
    <>
      <HeadMeta
        title={`${serieDetail?.name} | みんラリ`}
        description={`${serieDetail?.description}`}
        imgUrl={serieDetail?.top_photo_url || serieDetail?.google_image_url}
      />
      <SeriReviewPage serieId={id} serieDetail={serieDetail} />
    </>
  );
};

SeriReview.layout = OnlyFooterLayout;

SeriReview.getInitialProps = async context => {
  const { id } = context?.query;
  const response = await getSeriesDetail(id);
  return { serieDetail: response, id };
};

export default SeriReview;

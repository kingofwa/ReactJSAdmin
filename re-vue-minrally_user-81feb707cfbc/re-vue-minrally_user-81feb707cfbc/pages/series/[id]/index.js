/* eslint-disable import/no-unresolved */
import HeadMeta from "@components/HeadMeta";
import { getSeriesDetail } from "@components/Series/services";
import SerieDetail from "@components/Series/Top";
import OnlyFooterLayout from "layouts/only-footer-layout";

const SerieDetailPage = ({ serieDetail, id }) => {
  return (
    <>
      <HeadMeta
        title={`${serieDetail?.name} | みんラリ`}
        description={`${serieDetail?.description}`}
        imgUrl={serieDetail?.top_photo_url || serieDetail?.google_image_url}
      />
      <SerieDetail serieId={id} serieDetail={serieDetail} />
    </>
  );
};

SerieDetailPage.getInitialProps = async context => {
  const id = context?.query?.id;
  const response = await getSeriesDetail(id);
  return { serieDetail: response, id };
};

SerieDetailPage.layout = OnlyFooterLayout;

export default SerieDetailPage;

import HeadMeta from "@components/HeadMeta";
import SeriRankingPage from "@components/Series/Ranking";
import { getSeriesDetail } from "@components/Series/services";
import OnlyFooterLayout from "layouts/only-footer-layout";

const SeriRanking = ({ serieDetail, id }) => {
  return (
    <>
      <HeadMeta
        title={`${serieDetail?.name} | みんラリ`}
        description={`${serieDetail?.description}`}
        imgUrl={serieDetail?.top_photo_url || serieDetail?.google_image_url}
      />
      <SeriRankingPage serieId={id} serieDetail={serieDetail} />
    </>
  );
};

SeriRanking.getInitialProps = async context => {
  const { id } = context?.query;
  const response = await getSeriesDetail(id);
  return { serieDetail: response, id };
};

SeriRanking.layout = OnlyFooterLayout;
export default SeriRanking;

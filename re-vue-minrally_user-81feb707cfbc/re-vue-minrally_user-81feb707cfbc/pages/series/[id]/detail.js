import HeadMeta from "@components/HeadMeta";
import SeriDetail from "@components/Series/Detail";
import { getSeriesDetail } from "@components/Series/services";
import OnlyFooterLayout from "layouts/only-footer-layout";

const SeriDetailPage = ({ serieDetail, id }) => {
  return (
    <>
      <HeadMeta
        title={`${serieDetail?.name} | みんラリ`}
        description={`${serieDetail?.description}`}
        imgUrl={serieDetail?.top_photo_url || serieDetail?.google_image_url}
      />
      <SeriDetail serieId={id} serieDetail={serieDetail} />
    </>
  );
};

SeriDetailPage.getInitialProps = async context => {
  const { id } = context?.query;
  const response = await getSeriesDetail(id);
  return { serieDetail: response, id };
};

SeriDetailPage.layout = OnlyFooterLayout;

export default SeriDetailPage;

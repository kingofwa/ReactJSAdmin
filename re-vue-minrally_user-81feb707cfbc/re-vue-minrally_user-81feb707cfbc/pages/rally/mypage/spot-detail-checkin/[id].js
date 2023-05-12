import HeadMeta from "@components/HeadMeta";
import RallySpotDetailContainer from "@containers/RallySpotDetailContainer";
import { getSpotDetail } from "@services/game";
import OnlyFooterLayout from "layouts/only-footer-layout";
import { head } from "lodash";

const SpotDetail = ({ spotDetail, gameInfo }) => {
  const photo = head(spotDetail?.photo_urls) || spotDetail?.google_image_url;
  return (
    <>
      <HeadMeta
        title={`${gameInfo?.name}_${spotDetail?.name} | みんラリ"`}
        description={`${spotDetail?.description} `}
        imgUrl={photo}
      />
      <RallySpotDetailContainer isCheckin />
    </>
  );
};

SpotDetail.getInitialProps = async context => {
  const id = context?.query?.id;
  const response = await getSpotDetail(id);
  return { spotDetail: response?.data, gameInfo: response?.extra?.game };
};

SpotDetail.layout = OnlyFooterLayout;

export default SpotDetail;

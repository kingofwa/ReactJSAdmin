import HeadMeta from "@components/HeadMeta";
import RallyContainer from "@containers/RallyContainer";
import { getDetailGame } from "@services/game";
import OnlyFooterLayout from "layouts/only-footer-layout";

const RallyMyPage = ({ gameData }) => {
  return (
    <>
      <HeadMeta
        title={`${gameData?.name || "ラリー名"} | みんラリ`}
        description={`${gameData?.description || "ラリー説明"}`}
        imgUrl={gameData?.top_photo_url || gameData?.google_image_url}
      />
      <RallyContainer gameData={gameData} />
    </>
  );
};

RallyMyPage.getInitialProps = async context => {
  const id = context?.query?.id;
  const response = await getDetailGame(id);
  return { gameData: response };
};

RallyMyPage.layout = OnlyFooterLayout;

export default RallyMyPage;

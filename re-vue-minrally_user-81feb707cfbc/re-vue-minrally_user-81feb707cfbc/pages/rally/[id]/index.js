import HeadMeta from "@components/HeadMeta";
import RallyMyPageContainer from "@containers/RallyMyPageContainer";
// import { MainLayout } from "@layouts";
import { getDetailGame } from "@services/game";
import OnlyFooterLayout from "layouts/only-footer-layout";

const RallyTop = ({ gameData }) => {
  return (
    <>
      <HeadMeta
        title={`${gameData?.name || "ラリー名"} | みんラリ`}
        description={`${gameData?.description || "ラリー説明"}`}
        imgUrl={gameData?.top_photo_url || gameData?.google_image_url}
      />
      <RallyMyPageContainer gameData={gameData} />
    </>
  );
};

// RallyTop.layout = MainLayout;

RallyTop.getInitialProps = async context => {
  const id = context?.query?.id;
  const response = await getDetailGame(id);
  return { gameData: response };
};

RallyTop.layout = OnlyFooterLayout;

export default RallyTop;

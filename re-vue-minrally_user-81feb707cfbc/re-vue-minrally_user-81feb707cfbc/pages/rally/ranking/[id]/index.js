import HeadMeta from "@components/HeadMeta";
import RallyRankingContainer from "@containers/RallyRankingContainer";
import { getDetailGame } from "@services/game";
import OnlyFooterLayout from "layouts/only-footer-layout";
import { useRouter } from "next/router";

const Ranking = ({ gameData }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <HeadMeta
        title={`${gameData?.name || "ラリー名"} | みんラリ`}
        description={`${gameData?.description || "ラリー説明"}`}
        imgUrl={gameData?.top_photo_url || gameData?.google_image_url}
      />
      <RallyRankingContainer id={id} gameData={gameData} />
    </>
  );
};

Ranking.getInitialProps = async context => {
  const id = context?.query?.id;
  const response = await getDetailGame(id);
  return { gameData: response };
};

Ranking.layout = OnlyFooterLayout;

export default Ranking;

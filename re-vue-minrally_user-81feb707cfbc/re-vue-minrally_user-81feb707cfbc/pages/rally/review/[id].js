import { useRouter } from "next/router";
import RallyReviewContainer from "@containers/RallyReviewContainer";
import { getDetailGame } from "@services/game";
import HeadMeta from "@components/HeadMeta";
import OnlyFooterLayout from "layouts/only-footer-layout";

const Review = ({ gameData }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <HeadMeta
        title={`${gameData?.name || "ラリー名"} | みんラリ`}
        description={`${gameData?.description || "ラリー説明"}`}
        imgUrl={gameData?.top_photo_url || gameData?.google_image_url}
      />
      <RallyReviewContainer id={id} gameData={gameData} />
    </>
  );
};

Review.getInitialProps = async context => {
  const id = context?.query?.id;
  const response = await getDetailGame(id);
  return { gameData: response };
};

Review.layout = OnlyFooterLayout;

export default Review;

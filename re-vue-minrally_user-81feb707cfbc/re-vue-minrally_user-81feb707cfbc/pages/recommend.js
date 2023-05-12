import HeadMeta from "@components/HeadMeta";
import Recommend from "@components/TopPage/Recommend";
// import { HomeLayout } from "@layouts";
import DefaultLayout from "layouts/sub-layouts/default-layout";

const RecommendPage = () => {
  return (
    <>
      <HeadMeta
        title="おすすめラリー | みんラリ"
        description="「みんラリ」のおすすめラリー。おすすめのチェックインラリーを探してチェックインしてみよう！"
      />
      <Recommend />
    </>
  );
};

RecommendPage.layout = DefaultLayout;

export default RecommendPage;

import HeadMeta from "@components/HeadMeta";
import RankingRally from "@components/TopPage/Ranking/Rally";
import DefaultLayout from "layouts/sub-layouts/default-layout";

const Rally = () => {
  return (
    <>
      <HeadMeta
        title="ラリーランキング | みんラリ"
        description="「みんラリ」のラリーランキング。人気のランキングを探してチェックインしてみよう！"
      />
      <RankingRally />
    </>
  );
};

Rally.layout = DefaultLayout;

export default Rally;

import HeadMeta from "@components/HeadMeta";
import RallyMasterRanking from "@components/TopPage/Ranking/RallyMaster";
import DefaultLayout from "layouts/sub-layouts/default-layout";

const Creator = () => {
  return (
    <>
      <HeadMeta
        title="マスターランキング ｜ みんラリ"
        description="「みんラリ」のおすすめラリー。おすすめのチェックインラリーを探してチェックインしてみよう！"
      />
      <RallyMasterRanking />
    </>
  );
};

Creator.layout = DefaultLayout;

export default Creator;

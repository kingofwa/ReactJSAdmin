import HeadMeta from "@components/HeadMeta";
import PlayerRanking from "@components/TopPage/Ranking/Player";
import DefaultLayout from "layouts/sub-layouts/default-layout";

const User = () => {
  return (
    <>
      <HeadMeta
        title="プレイヤーランキング ｜ みんラリ"
        description="「みんラリ」のおすすめラリー。おすすめのチェックインラリーを探してチェックインしてみよう！"
      />
      <PlayerRanking />
    </>
  );
};

User.layout = DefaultLayout;

export default User;

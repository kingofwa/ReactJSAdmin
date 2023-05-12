import RankingTab from "@components/RankingTab";
import { RANKING_TAB } from "@config/constants";
import RankingUserList from "@components/RankingUserList";

const RankingCreatorContainer = () => {
  return (
    <>
      <RankingTab active={RANKING_TAB.CREATOR} />
      <RankingUserList />
      <RankingUserList />
      <RankingUserList />
      <RankingUserList />
    </>
  );
};

export default RankingCreatorContainer;

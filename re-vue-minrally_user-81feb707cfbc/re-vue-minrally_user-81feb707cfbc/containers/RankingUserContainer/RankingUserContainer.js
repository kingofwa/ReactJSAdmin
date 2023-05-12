import RankingTab from "@components/RankingTab";
import { RANKING_TAB } from "@config/constants";
import RankingUserList from "@components/RankingUserList";

const RankingUserContainer = () => {
  return (
    <>
      <RankingTab active={RANKING_TAB.USER} />
      <RankingUserList />
      <RankingUserList />
      <RankingUserList />
      <RankingUserList />
    </>
  );
};

export default RankingUserContainer;

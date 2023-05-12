import RankingTab from "@components/RankingTab";
import { RANKING_TAB } from "@config/constants";
import RallyList from "./elements/RallyList";

const RankingContainer = () => {
  return (
    <>
      <RankingTab active={RANKING_TAB.RALLY} />
      <RallyList />
    </>
  );
};

export default RankingContainer;

import RankingTab from "@components/RankingTab";
import { RANKING_TAB } from "@config/constants";
import RallyList from "./elements/RallyList";

const GrandRankingRallyContainer = () => {
  return (
    <>
      <RankingTab active={RANKING_TAB.GRAND_RALLY} />
      <RallyList />
    </>
  );
};

export default GrandRankingRallyContainer;

import GrandRankingRally from "@components/TopPage/Ranking/GrandRally";
import DefaultLayout from "layouts/sub-layouts/default-layout";

const GrandRallyPage = () => {
  return (
    <>
      <GrandRankingRally />
    </>
  );
};

GrandRallyPage.layout = DefaultLayout;

export default GrandRallyPage;

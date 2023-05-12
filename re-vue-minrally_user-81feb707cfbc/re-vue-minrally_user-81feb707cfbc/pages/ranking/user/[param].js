import RankingDetail from "@components/TopPage/Ranking/Player/RankingDetail";
// import { LayoutPageTop } from "@layouts";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const User = () => {
  return (
    // <LayoutPageTop>
    <RankingDetail />
    // </LayoutPageTop>
  );
};

User.layout = DefaultNoTabLayout;

export default User;

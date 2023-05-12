import { useRouter } from "next/router";
import RallyBadgeListContainer from "@containers/RallyBadgeListContainer";
import OnlyFooterLayout from "layouts/only-footer-layout";

const BadgeList = () => {
  const router = useRouter();
  const { id } = router.query;

  return <RallyBadgeListContainer id={id} />;
};

// BadgeList.layout = BadgeLayout;

BadgeList.layout = OnlyFooterLayout;

export default BadgeList;

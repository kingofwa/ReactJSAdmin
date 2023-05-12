import RallyCompleteContainer from "@containers/RallyCompleteContainer";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";
import { useRouter } from "next/router";

const RallyComplete = () => {
  const router = useRouter();
  const { id } = router.query;
  return <RallyCompleteContainer id={id} />;
};

RallyComplete.layout = DefaultNoTabLayout;
export default RallyComplete;

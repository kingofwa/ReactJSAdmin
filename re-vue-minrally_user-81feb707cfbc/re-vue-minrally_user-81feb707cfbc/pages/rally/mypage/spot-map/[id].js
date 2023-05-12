import RallySpotMapContainer from "@containers/RallySpotMapContainer";
import OnlyFooterLayout from "layouts/only-footer-layout";
import { useRouter } from "next/router";

const SpotMap = () => {
  const router = useRouter();
  const { id } = router.query;

  return <RallySpotMapContainer id={id} />;
};

SpotMap.layout = OnlyFooterLayout;
export default SpotMap;

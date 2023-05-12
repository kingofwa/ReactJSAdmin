/* eslint-disable import/no-unresolved */
import ProfileCreatorRally from "@components/profile/Creator/Rally";
import OnlyFooterLayout from "layouts/only-footer-layout";
import { useRouter } from "next/router";

const ProfileCreatorRallyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ProfileCreatorRally id={id} />;
};

ProfileCreatorRallyPage.layout = OnlyFooterLayout;

export default ProfileCreatorRallyPage;

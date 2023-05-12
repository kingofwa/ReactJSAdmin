/* eslint-disable import/no-unresolved */
import ProfilePlayerRally from "@components/profile/Player/Rally";
import OnlyFooterLayout from "layouts/only-footer-layout";
import { useRouter } from "next/router";

const ProfilePlayerRallyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ProfilePlayerRally id={id} />;
};

ProfilePlayerRallyPage.layout = OnlyFooterLayout;

export default ProfilePlayerRallyPage;

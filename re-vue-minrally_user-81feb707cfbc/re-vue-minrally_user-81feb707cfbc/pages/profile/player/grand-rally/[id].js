/* eslint-disable import/no-unresolved */
import ProfilePlayerGrand from "@components/profile/Player/GrandRally";
import OnlyFooterLayout from "layouts/only-footer-layout";
import { useRouter } from "next/router";

const ProfilePlayerGrandPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ProfilePlayerGrand id={id} />;
};

ProfilePlayerGrandPage.layout = OnlyFooterLayout;

export default ProfilePlayerGrandPage;

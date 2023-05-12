/* eslint-disable import/no-unresolved */
import ProfileCreatorGrand from "@components/profile/Creator/GrandRally";
import OnlyFooterLayout from "layouts/only-footer-layout";
import { useRouter } from "next/router";

const ProfileCreatorGrandPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ProfileCreatorGrand id={id} />;
};

ProfileCreatorGrandPage.layout = OnlyFooterLayout;

export default ProfileCreatorGrandPage;

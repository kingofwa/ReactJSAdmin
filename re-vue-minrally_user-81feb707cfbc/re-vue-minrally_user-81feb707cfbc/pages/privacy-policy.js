/* eslint-disable import/no-unresolved */
import PrivacyPolicyContainer from "@containers/PrivacyPolicyContainer";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const PrivacyPolicyPage = () => {
  return <PrivacyPolicyContainer />;
};

PrivacyPolicyPage.layout = DefaultNoTabLayout;
export default PrivacyPolicyPage;

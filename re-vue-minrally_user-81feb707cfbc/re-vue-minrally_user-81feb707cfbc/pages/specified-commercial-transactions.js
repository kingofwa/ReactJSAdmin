/* eslint-disable import/no-unresolved */
import SpecifiedCommercialTransactionsContainer from "@containers/SpecifiedCommercialTransactionsContainer";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const SpecifiedCommercialTransactionsPage = () => {
  return <SpecifiedCommercialTransactionsContainer />;
};

SpecifiedCommercialTransactionsPage.layout = DefaultNoTabLayout;
export default SpecifiedCommercialTransactionsPage;

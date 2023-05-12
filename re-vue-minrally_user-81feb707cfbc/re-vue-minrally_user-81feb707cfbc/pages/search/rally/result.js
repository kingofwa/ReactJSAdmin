/* eslint-disable import/no-unresolved */
import SearchRallyResultContainer from "@containers/SearchRallyResultContainer";
import { SearchResultLayout } from "@layouts";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

const SearchRallyResultPage = () => {
  return (
    <SearchResultLayout>
      <SearchRallyResultContainer />
    </SearchResultLayout>
  );
};

SearchRallyResultPage.layout = DefaultNoTabLayout;

export default SearchRallyResultPage;

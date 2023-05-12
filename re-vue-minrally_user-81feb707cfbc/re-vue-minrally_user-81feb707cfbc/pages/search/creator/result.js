/* eslint-disable import/no-unresolved */
import SearchCreatorResultContainer from "@containers/SearchCreatorResultContainer";
import { SearchResultLayout } from "@layouts";
import DefaultNoTabLayout from "layouts/sub-layouts/default-no-tab-layout";

// result of search creator
const SearchCreatorResultPage = () => {
  return (
    <SearchResultLayout>
      <SearchCreatorResultContainer />
    </SearchResultLayout>
  );
};

SearchCreatorResultPage.layout = DefaultNoTabLayout;

export default SearchCreatorResultPage;

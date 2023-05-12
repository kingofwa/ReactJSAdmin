// import { MainSearchLayout } from "@layouts";
import SearchCreatorContainer from "@containers/SearchCreatorContainer";
import HeadMeta from "@components/HeadMeta";

// search of creator

const SearchCreator = () => {
  return (
    <>
      <HeadMeta
        title="ユーザーを探す  | みんラリ"
        description="「みんラリ」のユーザーを探してみよう！"
      />
      {/* <MainSearchLayout> */}
      <SearchCreatorContainer />
      {/* </MainSearchLayout> */}
    </>
  );
};

export default SearchCreator;

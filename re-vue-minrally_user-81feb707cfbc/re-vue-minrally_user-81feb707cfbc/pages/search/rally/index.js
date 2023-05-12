import SearchRallyContainer from "@containers/SearchRallyContainer";
import HeadMeta from "@components/HeadMeta";

// search of rally

const SearchRally = () => {
  return (
    <>
      <HeadMeta
        title="ラリーを探す  | みんラリ"
        description="「みんラリ」のラリーを注目のハッシュタグ、やエリアから探してみよう！"
      />
      <SearchRallyContainer />
    </>
  );
};

export default SearchRally;

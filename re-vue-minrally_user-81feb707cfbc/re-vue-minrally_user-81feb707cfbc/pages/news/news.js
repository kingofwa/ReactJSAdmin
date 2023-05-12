import { NewsLayout } from "@layouts";
import NewsContainer from "@containers/NewsContainer";
import HeadMeta from "@components/HeadMeta";

const News = () => {
  return (
    <>
      <HeadMeta
        title="運営からのお知らせ  | みんラリ"
        description="「みんラリ」からのお知らせ"
      />
      <NewsLayout>
        <NewsContainer />
      </NewsLayout>
    </>
  );
};

export default News;

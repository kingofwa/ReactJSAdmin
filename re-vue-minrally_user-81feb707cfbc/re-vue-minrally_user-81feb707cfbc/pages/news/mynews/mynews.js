import MyNewsContainer from "@containers/MyNewsContainer";
import { NewsLayout } from "@layouts";
import HeadMeta from "@components/HeadMeta";
import withPrivateRoute from "@routes/withPrivaterRoute";

const MyNews = () => {
  return (
    <>
      <HeadMeta
        title="あなたへのお知らせ  | みんラリ"
        description="「みんラリ」からのお知らせ"
      />
      <NewsLayout>
        <MyNewsContainer />
      </NewsLayout>
    </>
  );
};

// MyNews.layout = PrivateLayout;

export default withPrivateRoute(MyNews);

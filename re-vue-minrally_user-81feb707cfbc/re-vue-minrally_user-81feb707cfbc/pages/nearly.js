import HeadMeta from "@components/HeadMeta";
import Nearly from "@components/TopPage/Nearly";
// import { HomeLayout } from "@layouts";
import DefaultLayout from "layouts/sub-layouts/default-layout";

const NearlyPage = () => {
  return (
    <>
      <HeadMeta
        title="近くで開催中のラリー | みんラリ"
        description="「みんラリ」の近くで開催中のラリー。近くのスポットに行ってチェックインしてみよう！"
      />
      <Nearly />
    </>
  );
};

NearlyPage.layout = DefaultLayout;
export default NearlyPage;

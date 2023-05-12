import HeadMeta from "@components/HeadMeta";
import TopPageComponent from "@components/TopPage";
import DefaultLayout from "layouts/sub-layouts/default-layout";

const TopPage = () => {
  return (
    <>
      <HeadMeta
        title="みんラリ | みんなで楽しむチェックインラリー"
        description="「みんラリ」とは、みんなで楽しむチェックインラリーのこと。チェックインラリーに参加したり、イベントラリーを作ったりして、みんながチェックインラリーを楽しむことができるWebサービスです。スマホやパソコンがあれば、利用は無料で、個人・企業・自治体の皆様など、誰でもご参加いただけます！"
      />
      <TopPageComponent />
    </>
  );
};

TopPage.layout = DefaultLayout;

export default TopPage;

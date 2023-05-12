/* eslint-disable import/no-unresolved */
// import Copyright from "@components/common/footer/Copyright";
import HeaderBack from "@components/common/header/HeaderBack";
import { map } from "lodash";
import styles from "./styles.module.scss";

const SpecifiedCommercialTransactionsContainer = () => {
  const list = [
    {
      title: "サービス運営事業者",
      content: "Fantrec株式会社"
    },
    {
      title: "サービス運営責任者",
      content: "津田　柊太朗"
    },
    {
      title: "電話番号",
      content: "03-6435-0931"
    },
    {
      title: "メールアドレス",
      content: "iq@fantrec.com"
    },
    // {
    //   title: "ホームページ",
    //   content: "http://fantrec.com/"
    // },
    {
      title: "販売価格",
      content: "商品ごとに記載します。"
    },
    {
      title: "購入代金以外に必要となる料金",
      content:
        "消費税、インターネット利用のために必要となる通信料、プロバイダ料金、その他料金"
    },
    {
      title: "支払方法",
      content: "クレジットカード決済"
    },
    {
      title: "代金支払時期",
      content: "商品購入時にお支払いが確定します。"
    },
    {
      title: "販売数量の制限",
      content: "商品により、販売数量が制限される場合がございます。"
    },
    {
      title: "キャンセル・交換・返品",
      content:
        "購入された商品（参加チケット等）のキャンセル・交換・返金はお受けできません。"
    }
  ];
  const renderItem = item => {
    return (
      <div className={styles.item}>
        <p className={styles.title}>■{item?.title}</p>
        <p className={styles.content}>{item?.content}</p>
      </div>
    );
  };

  return (
    <>
      <HeaderBack title="特定商取引法に基づく表記" hasMenu />
      <div className={styles.container}>
        <div className={styles.body}>{map(list, item => renderItem(item))}</div>
      </div>
    </>
  );
};

export default SpecifiedCommercialTransactionsContainer;

import { CustomButton } from "@components/common/buttons";
import { map } from "lodash";
import { useRouter } from "next/router";
import FaqItem from "./elements/FaqList/FaqItem";
import styles from "./FaqContainer.module.scss";

const FaqContainer = () => {
  const router = useRouter();

  const faqs = [
    {
      title: "みんラリとは？",
      content: `みんラリは、誰でも簡単にチェックインラリーを作成し、多くの方に遊んでもらったり、コミュニティのレクリエーションを無料で提供できるサービスです。スマホやパソコンがあれば、企業・自治体以外の一般の方々が「僕のラリー」「私のラリー」をつくり、誰でもご参加いただける、あたらしいプラットフォームです。\nまた、一般のラリーを遊べるのは短期間だけですが、みんラリは長い時間をかけてゆっくりと達成していくことが可能です。`
    },
    {
      title: "チェックインラリーとは？",
      content: `複数のスポット（場所）を登録し、そのスポットを巡る遊びのこと。登録されたスポット全部を巡ることで、いろんな場所を訪れたり、 訪れた場所の写真を記録して楽しむことができます。`
    },
    {
      title: "参加には費用はかかりますか？",
      content: `みんラリは無料でお楽しみいただけます。\n※スマートフォンなどの通信費はお客様のご負担となります。`
    },
    {
      title: "ユーザー登録をしなくても、ラリーを見ることはできますか？",
      content:
        "ラリーの閲覧は可能ですが、参加にはユーザー登録（無料）が必要です。"
    },
    {
      title: "ラリーマスターとは何ですか？",
      content: `チェックインラリーを作る人のことを、みんラリでは「ラリーマスター」と呼んでいます。\n自分に得意なことが有る方、地域について詳しいかたなど、ぜひチェックインラリーを一緒に作ってみませんか。\nみなさまのご参加をお待ちしております！\n※ラリーマスターとなるためには、審査があります。ユーザー登録後、ラリーマスター申請をお願いします。ラリーマスターは無料でなれます。`
    }
  ];

  const onSubmit = () => {
    router.push("https://note.com/37rally/m/m97b4e1051c65");
  };
  return (
    <>
      <div className={styles.faqContainer}>
        {map(faqs, faq => (
          <FaqItem data={faq} />
        ))}

        <div className={styles.row}>
          <CustomButton
            type="primary"
            className={styles.btnSubmit}
            variant="submit"
            onClick={onSubmit}
          >
            その他のよくある質問はこちら
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default FaqContainer;

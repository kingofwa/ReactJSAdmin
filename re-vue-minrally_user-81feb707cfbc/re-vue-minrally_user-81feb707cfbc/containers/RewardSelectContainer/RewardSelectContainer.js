import RewardForm from "@components/RewardForm";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

const RewardSelectContainer = () => {
  const router = useRouter();

  const mocks = [
    {
      title: "質問1",
      require: true,
      type: "text"
    },
    {
      title: "質問2",
      require: true,
      type: "textarea"
    },
    {
      title:
        "質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3",
      require: true,
      type: "checkbox",
      items: [
        {
          title: "項目",
          value: 1,
          image: "/img/reward-mock.png",
          checked: true
        },
        {
          title: "項目",
          value: 2,
          image: "/img/reward-mock.png",
          checked: false
        },
        {
          title: "項目",
          value: 3,
          image: "/img/reward-mock.png",
          checked: false
        }
      ]
    },
    {
      title: "質問4質問4質問4質問4質問4質問4質問4質問4質問4質問4質問4質問4",
      require: true,
      type: "radio",
      items: [
        {
          title: "項目",
          value: 1,
          checked: true,
          image: "/img/reward-mock.png"
        },
        {
          title: "項目",
          value: 2,
          checked: false,
          image: "/img/reward-mock.png"
        },
        {
          title: "項目",
          image: "/img/reward-mock.png",
          value: 3,
          checked: false
        }
      ]
    }
  ];

  return (
    <>
      <div className={styles.header}>
        <div onClick={() => router.back()}>
          <img
            src="/icons/ic-back.svg"
            alt="ic-back"
            className={styles.icBack}
          />
        </div>
        <p className={styles.rallyName}>
          ラリー名ラリー名ラリー名ラリー名ラリー名ラリー名ラリー名ラリー名ラリー名ラリー名
        </p>
      </div>
      <div className={styles.title}>獲得報酬</div>
      <div className={styles.FormContainer}>
        <div className={styles.noteTitle}>
          メッセージ例 <br />
          制覇報酬として抽選で00名様にオリジナルグッズをプレゼントいたします。
          <br />
          当選者の発表は賞品の発送をもってかえさせていただきます。
          <br />
          <strong>報酬の申込期限：2023/3/24</strong>
        </div>
        <RewardForm data={mocks} />
      </div>
    </>
  );
};

export default RewardSelectContainer;

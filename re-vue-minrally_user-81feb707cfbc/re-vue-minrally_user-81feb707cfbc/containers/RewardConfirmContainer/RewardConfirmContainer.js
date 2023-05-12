import RewardForm from "@components/RewardForm";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

const RewardConfirmContainer = () => {
  const router = useRouter();
  const mocks = [
    {
      title: "質問1",
      require: true,
      type: "text",
      anwsers: "質問"
    },
    {
      title: "質問2",
      require: true,
      type: "textarea",
      anwsers:
        "質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問質問"
    },
    {
      title:
        "質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3質問3",
      require: true,
      type: "checkbox",
      anwsers: [
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
        }
      ]
    },
    {
      title: "質問4質問4質問4質問4質問4質問4質問4質問4質問4質問4質問4質問4",
      require: true,
      type: "radio",
      anwsers: [
        {
          title: "項目",
          value: 1,
          checked: false,
          image: "/img/reward-mock.png"
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
        <RewardForm data={mocks} alertMessage="入力内容確認" isPreview />
      </div>
    </>
  );
};

export default RewardConfirmContainer;

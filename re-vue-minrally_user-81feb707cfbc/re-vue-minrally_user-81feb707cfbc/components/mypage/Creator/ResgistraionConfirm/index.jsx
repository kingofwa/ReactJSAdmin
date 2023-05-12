/* eslint-disable import/no-unresolved */
import HeaderBack from "@components/common/header/HeaderBack";
import React from "react";
import Link from "next/link";
import PATHS from "@config/paths";
import styles from "./styles.module.scss";

const ResgistraionConfirm = () => {
  return (
    <>
      <HeaderBack title="ラリーマスター申請" hasMenu />
      <div className={styles.contentConfirm}>
        <div className={styles.title}>ラリーマスター申請が完了しました。</div>
        <div className={styles.desc}>
          内容を確認の上、ラリーマスター申請が承認され次第、
          <br />
          こちらでお知らせいたします。
        </div>
        <Link href={`${PATHS.mypageCreator}`}>
          <a className={styles.btnMyPage}>マイページへ戻る</a>
        </Link>
      </div>
    </>
  );
};

export default ResgistraionConfirm;

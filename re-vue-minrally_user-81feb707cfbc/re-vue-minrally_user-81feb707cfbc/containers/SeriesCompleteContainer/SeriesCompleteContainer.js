import { getSeriHistories } from "@services/seri";
import { STATUS_RESPONSE } from "@utils/constants";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import CompleteItem from "./elements/CompleteItem";
import styles from "./Styles.module.scss";

const SeriesCompleteContainer = () => {
  const router = useRouter();
  const { id } = router.query;

  const [histories, setHistories] = useState([]);

  const fetchSeriesHistories = useCallback(() => {
    if (id)
      getSeriHistories(id).then(res => {
        if (res.status === STATUS_RESPONSE.success) setHistories(res.data);
      });
  }, [id]);

  useEffect(() => {
    fetchSeriesHistories();
  }, [fetchSeriesHistories]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div onClick={() => router.back()}>
            <img
              src="/icons/ic-back.svg"
              alt="ic-back"
              className={styles.icBack}
            />
          </div>
          <p className={styles.title}>制覇記録一覧</p>
        </div>
        <div>
          {histories?.map((history, index) => (
            <CompleteItem
              history={history}
              key={history?.id}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SeriesCompleteContainer;

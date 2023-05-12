import { getSeriRanking } from "@components/TopPage/service";
import { LoaderContext } from "@contexts/loader";
import { useContext, useEffect, useState } from "react";

const useGrandRanking = (type, limit, serieId) => {
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [currentUser, setCurrentUser] = useState();

  const fetchSeriRanking = () => {
    if (type && serieId) {
      showLoadingAnim();

      // If there is no "limit", it is infinite scroll
      const params = { page, per: limit ?? 20, sort_by: type };
      getSeriRanking(params, serieId)
        .then(res => {
          setPlayers([...players, ...res.data]);
          setTotal(res.meta.count);
          setPage(res.meta.next);
          setCurrentUser(res?.extra?.current_user_possition);
        })
        .finally(hideLoadingAnim());
    }
  };

  useEffect(() => {
    fetchSeriRanking();
  }, [type, limit, serieId]);

  return { players, total, fetchSeriRanking, currentUser };
};

export default useGrandRanking;

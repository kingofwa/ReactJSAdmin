import { getRallyRaking } from "@components/TopPage/service";
import { LoaderContext } from "@contexts/loader";
import { useContext, useEffect, useState } from "react";

const useRallyRanking = (type, limit, id) => {
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [currentUser, setCurrentUser] = useState();

  const fetchRallyRanking = () => {
    if (type && id) {
      showLoadingAnim();

      // If there is no "limit", it is infinite scroll
      const params = { page, per: limit ?? 20, sort_by: type };
      getRallyRaking(params, id)
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
    fetchRallyRanking();
  }, [type, limit, id]);

  return { players, total, fetchRallyRanking, currentUser };
};

export default useRallyRanking;

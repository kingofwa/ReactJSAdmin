import { getPlayersRaking } from "@components/TopPage/service";
import { useEffect, useState } from "react";

const usePlayerRanking = (type, limit) => {
  // const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // const fetchPlayersRanking = () => {
  //   if (type) {
  //     showLoadingAnim();

  //     // If there is no "limit", it is infinite scroll
  //     const params = { page, per: limit ?? 20, sort_by: type };
  //     getPlayersRaking(params)
  //       .then(res => {
  //         setPlayers([...players, ...res.data]);
  //         setTotal(res.meta.count);
  //         setPage(res.meta.next);
  //         setCurrentUser(res?.extra?.current_user_possition);
  //       })
  //       .finally(hideLoadingAnim());
  //   }
  // };

  const fetchPlayersRanking = async () => {
    try {
      if (type) {
        setIsLoading(true);
        const params = { page, per: limit ?? 20, sort_by: type };
        const res = await getPlayersRaking(params);
        setPlayers([...players, ...res.data]);
        setTotal(res.meta.count);
        setPage(res.meta.next);
        setCurrentUser(res?.extra?.current_user_possition);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayersRanking();
  }, [type, limit]);

  return { players, total, fetchPlayersRanking, currentUser, isLoading, page };
};

export default usePlayerRanking;

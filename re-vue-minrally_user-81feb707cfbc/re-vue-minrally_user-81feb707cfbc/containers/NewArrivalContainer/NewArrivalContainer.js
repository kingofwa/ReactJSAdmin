import TopList from "@components/TopList";
import { TOP_TYPE } from "@config/constants";
import { getGames } from "@services/top";
import { message } from "antd";
import { useState, useEffect } from "react";

const NewArrivalContainer = () => {
  const [pagination, setPagination] = useState({ page: 0, total: 0 });
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getGames({ sort_by: "arrivals", page: 1, per: 10 });
      setPagination({ page: 1, total: data.total });
      setGames(data.items);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const data = await getGames({
        sort_by: "arrivals",
        page: pagination.page + 1,
        per: 10
      });
      setPagination({ ...pagination, page: pagination.page + 1 });
      setGames([...games, ...data.items]);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TopList
        items={games}
        fetchMoreData={fetchMoreData}
        pagination={pagination}
        type={TOP_TYPE.GAME}
      />
    </>
  );
};

export default NewArrivalContainer;

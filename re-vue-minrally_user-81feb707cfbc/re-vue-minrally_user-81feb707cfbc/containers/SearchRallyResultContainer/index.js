/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import { searchGames } from "@services/search";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { omit, size } from "lodash";
import HeaderSearchResult from "./components/Header";
import ListRallyResult from "./components/ListRally";

const SearchRallyResultContainer = () => {
  const [pagination, setPagination] = useState({ page: 0, total: 0 });
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const keyword = router?.query?.keyword;
  const tag = router?.query?.tag;
  const user_point_lat = router?.query?.user_point_lat;
  const user_point_lng = router?.query?.user_point_lng;
  const prefecture = router?.query?.prefecture;
  const type = router?.query?.type;
  const [searchKey, setSearchKey] = useState();

  const getParams = () => {
    const params = {};
    if (size(keyword) > 0) {
      params.q = keyword;
    }
    if (size(tag) > 0) {
      params.tag_name = `#${tag}`;
    }
    if (size(user_point_lat) > 0) {
      params.user_point_lat = user_point_lat;
    }
    if (size(user_point_lng) > 0) {
      params.user_point_lng = user_point_lng;
    }
    if (size(prefecture) > 0) {
      params.prefecture = prefecture;
    }
    if (size(type) > 0) {
      params.type = type;
    }
    return params;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = getParams();
      const currentParams = omit(params, ["type"]);
      const data = await searchGames({ ...currentParams, page: 1, per: 10 });
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
      let data = {};
      const params = getParams();
      const currentParams = omit(params, ["type"]);
      data = await searchGames({
        ...currentParams,
        page: pagination.page + 1,
        per: 10
      });
      setPagination({ ...pagination, page: pagination.page + 1 });
      setGames([...games, ...data.items]);
    } catch (error) {
      message.error(error?.message);
    }
  };

  useEffect(() => {
    const keyTag = tag ? `#${tag}` : "";
    setSearchKey(keyword || prefecture || keyTag);
    const params = getParams();
    if (size(params) > 0) {
      fetchData();
    }
  }, [router.query]);

  return (
    <>
      <HeaderSearchResult title="ラリー検索結果" keySearch={searchKey} />
      <div className="pt-30 bg-gray" />
      <ListRallyResult
        items={games}
        fetchMoreData={fetchMoreData}
        pagination={pagination}
      />
    </>
  );
};

export default SearchRallyResultContainer;

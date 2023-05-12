/* eslint-disable import/no-unresolved */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { searchProfiles } from "@services/search";
import HeaderSearchResult from "./components/Header";
import ListResult from "./components/ListResult";

const SearchCreatorResultContainer = () => {
  const router = useRouter();
  const [creators, setCreators] = useState([]);
  const [pagination, setPagination] = useState({ page: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const keyword = router?.query?.keyword;

  const fetchCreators = async () => {
    try {
      setLoading(true);
      let data = {};
      data = await searchProfiles({
        q: keyword,
        page: 1,
        per: 10
      });
      setPagination({ page: 1, total: data.total });
      setCreators(data.items);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreCreator = async () => {
    if (loading) {
      return;
    }
    try {
      let data = {};
      data = await searchProfiles({
        q: keyword,
        page: pagination.page + 1,
        per: 10
      });
      setPagination({ ...pagination, page: pagination.page + 1 });
      setCreators([...creators, ...data.items]);
    } catch (error) {
      message.error(error?.message);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, [keyword]);

  return (
    <>
      <HeaderSearchResult title="ユーザー検索結果" keyword={keyword} />
      <Spin spinning={loading}>
        <ListResult
          pagination={pagination}
          creators={creators}
          fetchMoreCreator={fetchMoreCreator}
        />
      </Spin>
    </>
  );
};

export default SearchCreatorResultContainer;

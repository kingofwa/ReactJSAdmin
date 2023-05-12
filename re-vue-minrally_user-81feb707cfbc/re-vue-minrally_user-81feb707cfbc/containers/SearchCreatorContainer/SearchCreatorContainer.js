import { useState, useEffect } from "react";
import SearchInput from "@components/common/form/search-input";
import HeaderMenu from "@components/common/header/HeaderMenu";
import { SEARCH_MENU } from "@config/constants";
import { message } from "antd";
import { useRouter } from "next/router";
import { getProfiles } from "@services/search";
import CreatorList from "./elements/CreatorList";
import styles from "./SearchCreatorContainer.module.scss";

const SearchRallyContainer = () => {
  const [creators, setCreators] = useState([]);
  const [pagination, setPagination] = useState({ page: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const fetchCreators = async () => {
    try {
      setLoading(true);
      let data = {};
      data = await getProfiles({
        page: 1,
        per: 20
      });
      setPagination({ page: 1, total: data.total });
      setCreators(data.items);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      setLoading(true);
      let data = {};
      data = await getProfiles({
        page: pagination.page + 1,
        per: 20
      });
      setPagination({ ...pagination, page: pagination.page + 1 });
      setCreators([...creators, ...data.items]);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onChangeSearch = e => {
    setKeyword(e?.target?.value);
  };

  const onSearch = () => {
    router.push(`/search/creator/result?keyword=${keyword.trim()}`);
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  return (
    <>
      <HeaderMenu menus={SEARCH_MENU} />
      <div className={styles.searchCreatorContainer}>
        <div className={styles.searchInput}>
          <SearchInput
            inputProps={{
              placeholder: "フリーワード検索",
              onPressEnter: onSearch
            }}
            onChange={onChangeSearch}
            value={keyword}
            onSearch={onSearch}
          />
        </div>
        <CreatorList
          fetchMoreData={fetchMoreData}
          items={creators}
          pagination={pagination}
          loading={loading}
        />
      </div>
    </>
  );
};

export default SearchRallyContainer;

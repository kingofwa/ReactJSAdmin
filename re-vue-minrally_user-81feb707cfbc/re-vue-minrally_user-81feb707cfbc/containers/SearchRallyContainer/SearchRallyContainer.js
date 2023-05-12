/* eslint-disable no-constant-condition */
import SearchInput from "@components/common/form/search-input";
import HeaderMenu from "@components/common/header/HeaderMenu";
import { SEARCH, SEARCH_MENU } from "@config/constants";
import PATHS from "@config/paths";
import { getTags } from "@services/search";
import {
  retrieveSearchRally,
  setSearchRally
} from "@utils/storage/search-rally";
import { message } from "antd";
import { cloneDeep, get, map, replace, size } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AreaSearch from "./elements/AreaSearch";
import styles from "./SearchRallyContainer.module.scss";

const SearchRallyContainer = () => {
  const [tags, setTags] = useState([]);

  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const searchHistory = retrieveSearchRally() || [];

  const fetchTags = async () => {
    try {
      const response = await getTags();
      setTags(response);
    } catch (error) {
      message.error(error?.message);
    }
  };

  const onSearch = () => {
    const searchArr = searchHistory;
    if (keyword?.length > 0) {
      let item = {
        type: SEARCH.KEYWORD,
        value: keyword
      };
      const isSearchTag = get(keyword.trim(), "[0]") === "#";
      if (isSearchTag) {
        item = {
          type: SEARCH.TAG,
          value: keyword.trim()
        };
      }
      searchArr.push(item);
      setSearchRally(searchArr);

      if (isSearchTag) {
        const key = replace(keyword, new RegExp(/#/, "g"), "");
        router.push(`${PATHS.searchRallyResult}?tag=${key.trim()}`);
      } else {
        router.push(`${PATHS.searchRallyResult}?keyword=${keyword.trim()}`);
      }
    } else {
      router.push(`${PATHS.searchRallyResult}?type=ALL`);
    }
  };

  const onChangeSearch = e => {
    setKeyword(e?.target?.value);
  };

  const history = () => {
    let list = cloneDeep(searchHistory.reverse());
    if (size(list) >= 5) {
      list = list.splice(0, 5);
    }
    return list;
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const goSearchResult = (value, type) => {
    if (type === SEARCH.KEYWORD) {
      router.push(`${PATHS.searchRallyResult}?keyword=${value.trim()}`);
    }
    if (type === SEARCH.TAG) {
      router.push(`${PATHS.searchRallyResult}?tag=${value.trim()}`);
    }
    if (type === SEARCH.PREFECTURE) {
      router.push(`${PATHS.searchRallyResult}?prefecture=${value.trim()}`);
    }
  };

  const goSearchPrefecture = prefecture => {
    const searchArr = searchHistory;
    const item = {
      type: SEARCH.PREFECTURE,
      value: prefecture
    };
    searchArr.push(item);
    setSearchRally(searchArr);
    router.push(`${PATHS.searchRallyResult}?prefecture=${prefecture}`);
  };

  const goSearchTag = tag => {
    const searchArr = searchHistory;
    const item = {
      type: SEARCH.TAG,
      value: tag
    };
    searchArr.push(item);
    setSearchRally(searchArr);
    const queryTag = replace(tag, new RegExp(/#/, "g"), "");
    router.push(`${PATHS.searchRallyResult}?tag=${queryTag}`);
  };

  return (
    <>
      <HeaderMenu menus={SEARCH_MENU} />
      <div className={styles.searchRallyContainer}>
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

        <div className={styles.contentItem}>
          <div className={styles.title}>
            <span>注目のハッシュタグ</span>
          </div>
          <div className={styles.tags}>
            {tags?.map(tag => {
              return (
                <span
                  className={styles.tag}
                  key={tag.id}
                  onClick={() => goSearchTag(tag.name)}
                >
                  {tag.name}
                </span>
              );
            })}
          </div>
        </div>

        <AreaSearch keyword={keyword} goSearchPrefecture={goSearchPrefecture} />

        <div className={styles.contentItem}>
          <div className={styles.title}>
            <span>検索履歴</span>
          </div>
          <div className={styles.tags}>
            {map(history(), item => (
              <span
                className={styles.tag}
                onClick={() => goSearchResult(item?.value, item?.type)}
              >
                {item?.type === SEARCH.TAG ? `${item?.value}` : item?.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchRallyContainer;

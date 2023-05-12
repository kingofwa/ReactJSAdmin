import React, { useEffect, useState } from 'react';
import CustomButton from '@components/buttons/custom-button';
import { NUM_PER_PAGE_RECOMMEND } from '@config/constants';
import { Form, AutoComplete, message } from 'antd';
import HashtagTable from './elements/HashtagTable';
import {
  getTags,
  updateFeaturedHashtags,
  getRankingTopHashtags
} from '@api/tags';
import { CustomForm } from '@components/form';
import RankingTable from './elements/RankingTable';
import { generateFormData } from '@utils/form';
import './styles.scss';

const formName = 'search-recommendation-grand';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const Hashtag = ({ location }) => {
  const [keyword, setKeyword] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [reload, setReload] = useState(true);
  const [tagsFeature, setTagsFeature] = useState(null);
  const [topHashTags, setTopHashTags] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE_RECOMMEND
  });
  const [form] = Form.useForm();

  const fetchTags = async (page = 1) => {
    try {
      setLoading(true);
      const newParams = {
        page,
        per: NUM_PER_PAGE_RECOMMEND,
        is_featured: true
      };
      const response = await getTags(newParams);
      setTagsFeature(response?.data);
      setPagination({
        ...pagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
    } catch (error) {
      //
    } finally {
      setLoading(false);
      setReload(false);
    }
  };

  const fetchRankingTopHashtags = async () => {
    try {
      setLoadingRanking(true);
      const response = await getRankingTopHashtags();
      const topHashTags = response?.hashtags_ranking;
      topHashTags.sort((a, b) => b.total_count - a.total_count);
      setTopHashTags(topHashTags);
    } catch (error) {
      //
    } finally {
      setLoadingRanking(false);
    }
  };

  const onPageChange = newPage => {
    fetchTags(newPage);
  };

  useEffect(() => {
    if (reload) {
      fetchTags();
      fetchRankingTopHashtags();
    }
    // eslint-disable-next-line
  }, [reload]);

  const handleSelected = keyword => {
    setKeyword(keyword);
  };

  const updateFeature = async () => {
    try {
      const params = {
        list_update_names: keyword
      };
      const payload = await generateFormData(params);
      await updateFeaturedHashtags(payload);
      setReload(true);
    } catch (error) {
      message.error(error);
    }
  };

  const handleSearchTags = async searchText => {
    setKeyword(searchText);
    let dataSearch;
    let options = [];
    const searchParams = { q: searchText, is_featured: false };
    try {
      const response = await getTags(searchParams);
      dataSearch = response?.data;
      Object.keys(dataSearch).forEach(function (key) {
        options.push({ value: dataSearch[key]?.name });
      });
      setSearchOptions(options);
    } catch (error) {
      console.error(error);
    }
  };

  const reloadData = () => {
    setReload(true);
  };
  return (
    <>
      <div className="featured-management-body">
        <div className="featured-management-main-table">
          <CustomForm
            name={formName}
            autoComplete="off"
            form={form}
            {...formItemLayout}
          >
            <div className="featured-management-search">
              <Form.Item name="tag">
                <AutoComplete
                  autoComplete={'off'}
                  onSearch={handleSearchTags}
                  onSelect={handleSelected}
                  style={{
                    width: 539
                  }}
                  options={searchOptions}
                  placeholder="ハッシュタグを追加する"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
                {searchOptions.length === 0 && keyword.length !== 0 && (
                  <div className="ant-form-item-explain-error">
                    このハッシュタグが存在しません。
                  </div>
                )}
              </Form.Item>
              <CustomButton onClick={() => updateFeature()}>追加</CustomButton>
            </div>
          </CustomForm>
          <HashtagTable
            data={tagsFeature}
            onPageChange={onPageChange}
            pagination={pagination}
            fetchData={fetchTags}
            loading={loading}
            reloadData={reloadData}
          />
        </div>
        <div className="featured-management-ranking">
          <RankingTable
            isHashtag
            loading={loadingRanking}
            data={topHashTags}
            title="今月のハッシュタグ利用ランキング"
          />
        </div>
      </div>
    </>
  );
};

export default Hashtag;

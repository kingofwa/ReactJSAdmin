import React, { useEffect, useState } from 'react';
import CustomButton from '@components/buttons/custom-button';
import { NUM_PER_PAGE_RECOMMEND } from '@config/constants';
import { Form, AutoComplete, message } from 'antd';
import RecommendationTable from './elements/RecommendationTable';
import { getRecommendations, updateRecommended } from '@api/recommendation';
import { CustomForm } from '@components/form';
import { generateFormData } from '@utils/form';
import './styles.scss';

const formName = 'search-recommendation-grand';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const RallyGrand = ({ location }) => {
  const [reLoad, setReload] = useState(true);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [rallyRecommendation, setRallyRecommendation] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE_RECOMMEND,
    type: 'grand',
    is_recommended: true
  });
  const [form] = Form.useForm();

  const fetchRecommendations = async (page = 1) => {
    try {
      setLoading(true);
      const newParams = {
        page,
        per: NUM_PER_PAGE_RECOMMEND,
        type: 'grand',
        is_recommended: true
      };
      const response = await getRecommendations(newParams);
      setRallyRecommendation(response?.data);
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

  const onPageChange = newPage => {
    fetchRecommendations(newPage);
  };

  useEffect(() => {
    if (reLoad) {
      fetchRecommendations();
    }
    // eslint-disable-next-line
  }, [reLoad]);

  const handleSelected = keyword => {
    setKeyword(keyword);
  };

  const handleSearchRally = async searchText => {
    setKeyword(searchText);
    let dataSearch;
    let options = [];
    const searchParams = {
      q: searchText,
      is_recommended: false,
      type: 'grand'
    };
    try {
      const response = await getRecommendations(searchParams);
      dataSearch = response?.data;
      Object.keys(dataSearch).forEach(function (key) {
        options.push({
          id: dataSearch[key]?.id,
          value: dataSearch[key]?.name
        });
      });
      setSearchOptions(options);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetRecommend = async () => {
    try {
      const params = {
        type: 'grand',
        add_recommend: keyword
      };
      const payload = await generateFormData(params);
      await updateRecommended(payload);
      setReload(true)
    } catch (error) {
      message.error(error);
    }
  };
  const reloadData = () => {
    setReload(true)
  }
  return (
    <>
      <div>
        <CustomForm
          name={formName}
          autoComplete="off"
          form={form}
          {...formItemLayout}
        >
          <div className="featured-management-search">
            <Form.Item name="key">
              <AutoComplete
                autoComplete={"off"}
                onSearch={handleSearchRally}
                onSelect={handleSelected}
                style={{
                  width: 539
                }}
                options={searchOptions}
                placeholder="グランドラリーを検索して追加"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
              {searchOptions.length === 0 && keyword.length !== 0 && (
                <div className="ant-form-item-explain-error">このグランドラリーが存在しません。</div>
              )}
            </Form.Item>
            <CustomButton onClick={() => handleSetRecommend()}>
              追加
            </CustomButton>
          </div>
        </CustomForm>
      </div>
      <RecommendationTable
        data={rallyRecommendation}
        onPageChange={onPageChange}
        pagination={pagination}
        fetchData={fetchRecommendations}
        isGrand={true}
        loading={loading}
        reloadData={reloadData}
      />
    </>
  );
};

export default RallyGrand;

import React, { useEffect, useState } from 'react';
import CustomButton from '@components/buttons/custom-button';
import { NUM_PER_PAGE_RECOMMEND } from '@config/constants';
import { Form, AutoComplete, message } from 'antd';
import UsersTable from './elements/UsersTable';
import {
  getFeaturedUsers,
  searchUsers,
  updateFeaturedUser,
  getRankingTopUsers
} from '@api/user';
import { CustomForm } from '@components/form';
import { generateFormData } from '@utils/form';
import RankingTable from './elements/RankingTable';
import './styles.scss';

const formName = 'search-recommendation-rally';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const Users = ({ location }) => {
  const [keyword, setKeyword] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [reload, setReload] = useState(true);
  const [recommendations, setRecommendations] = useState();
  const [topUsers, setTopUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE_RECOMMEND
  });
  const [form] = Form.useForm();

  const fetchUsersFeatured = async (page = 1) => {
    try {
      setLoading(true);
      const newParams = { page, per: NUM_PER_PAGE_RECOMMEND };
      const response = await getFeaturedUsers(newParams);
      setRecommendations(response?.data);
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

  const fetchRankingTopUsers = async () => {
    try {
      setLoadingRanking(true);
      const response = await getRankingTopUsers();
      const newTopRaking = response?.ranking_top_users?.map(item => {
        const itemNew = { ...item };
        itemNew.total_count = itemNew.visit_count + itemNew.follower_count;
        return itemNew;
      });
      newTopRaking.sort((a, b) => b.total_count - a.total_count);
      setTopUsers(newTopRaking);
    } catch (error) {
      //
    } finally {
      setLoadingRanking(false);
    }
  };

  const onPageChange = newPage => {
    fetchUsersFeatured(newPage);
  };

  useEffect(() => {
    if (reload) {
      fetchUsersFeatured();
      fetchRankingTopUsers();
    }
    // eslint-disable-next-line
  }, [reload]);

  const handleSelected = keyword => {
    setKeyword(keyword);
  };

  const handleSearchUsers = async searchText => {
    setKeyword(searchText);
    let dataSearch;
    let options = [];
    const searchParams = { user_name: searchText, search_feature: 'yes' };
    try {
      const response = await searchUsers(searchParams);
      dataSearch = response?.data;
      Object.keys(dataSearch).forEach(function (key) {
        if (
          dataSearch[key]?.user_name &&
          dataSearch[key]?.is_featured !== true
        ) {
          options.push({
            id: dataSearch[key]?.id,
            value: dataSearch[key]?.user_name
          });
        }
      });
      console.log(options);
      setSearchOptions(options);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetFeaturedUser = async () => {
    try {
      const params = {
        list_update: keyword
      };
      const payload = await generateFormData(params);
      await updateFeaturedUser(payload);
      setReload(true);
    } catch (error) {
      message.error(error);
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
              <Form.Item name="key">
                <AutoComplete
                  autoComplete={'off'}
                  onSearch={handleSearchUsers}
                  onSelect={handleSelected}
                  style={{
                    width: 539
                  }}
                  options={searchOptions}
                  placeholder="ユーザーを追加する"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
                {searchOptions.length === 0 && keyword.length !== 0 && (
                  <div className="ant-form-item-explain-error">
                    このユーザーが存在しません。
                  </div>
                )}
              </Form.Item>
              <CustomButton onClick={() => handleSetFeaturedUser()}>
                追加
              </CustomButton>
            </div>
          </CustomForm>
          <UsersTable
            data={recommendations}
            onPageChange={onPageChange}
            pagination={pagination}
            fetchData={fetchUsersFeatured}
            loading={loading}
            reloadData={reloadData}
          />
        </div>
        <div className="featured-management-ranking">
          <RankingTable
            title="今月のユーザーアクセスランキング"
            loading={loadingRanking}
            data={topUsers}
          />
        </div>
      </div>
    </>
  );
};

export default Users;

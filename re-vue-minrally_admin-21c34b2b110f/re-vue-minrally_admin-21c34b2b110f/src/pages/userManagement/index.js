import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import UserTab from './elements/UserTab';
import FilterSearch from './elements/FilterSearch';
import { getUsers } from '@api/user';
import { NUM_PER_PAGE } from '@config/constants';
import { get } from 'lodash';
import moment from 'moment';
import { DATE_LINE } from '@utils/date';
import Scroll from 'react-scroll';
import './styles.scss';

const UserManagement = ({ location }) => {
  const scroll = Scroll.animateScroll;
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });
  const [currentParams, setCurrentParams] = useState({});

  const onPageChange = newPage => {
    fetchUsers(newPage, currentParams);
  };

  const fetchUsers = async (page = 1, params = {}) => {
    try {
      setLoading(true);
      const newParams = { ...params, page, per: NUM_PER_PAGE };
      const response = await getUsers(newParams);
      setUsers(response?.data);
      setPagination({
        ...pagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
      scroll.scrollToTop();
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  const delUserSuccess = () => {
    fetchUsers(pagination.current);
  };

  const onSearchUser = async values => {
    const params = {};
    const email = get(values, 'email', null);
    const user_name = get(values, 'user_name', null);
    const startDate = get(values, ['period', 'startDate'], null);
    const endDate = get(values, ['period', 'endDate'], null);
    const master_registration = get(values, ['master_registration'], null);
    if (master_registration) {
      params.master_registration = master_registration;
    }
    if (email) {
      params.email = email;
    }
    if (user_name) {
      params.user_name = user_name;
    }
    if (startDate) {
      params.start_date = moment(startDate).format(DATE_LINE);
    }
    if (endDate) {
      params.end_date = moment(endDate).format(DATE_LINE);
    }
    setCurrentParams(params);
    fetchUsers(1, params);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: null,
          breadcrumbName: 'ユーザー管理'
        }
      }
    ];
  };

  return (
    <>
      <HeaderTitle title="ユーザー管理" isUser />
      <div className="main-container user-management">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="user-content">
          <UserTab
            data={users}
            onPageChange={onPageChange}
            pagination={pagination}
            loading={loading}
            delUserSuccess={delUserSuccess}
          />
          <FilterSearch
            onSearchUser={onSearchUser}
            fetchUsers={fetchUsers}
            setCurrentParams={setCurrentParams}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagement;

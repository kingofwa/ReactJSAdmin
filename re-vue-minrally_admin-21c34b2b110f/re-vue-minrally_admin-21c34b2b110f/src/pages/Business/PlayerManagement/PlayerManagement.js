import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import PlayerFilterSearch from '@components/Business/BusinessPlayerTable/PlayerFilterSearch';
import BusinessPlayerTable from '@components/Business/BusinessPlayerTable';
import { getPlayerList } from '@api/user';
import { get } from 'lodash';
import moment from 'moment';
import { DATE_LINE } from '@utils/date';

import './styles.scss';

const NUM_PER_PAGE = 20;

const onMatchedRoutes = () => {
  return [
    {
      route: {
        path: null,
        breadcrumbName: '参加者管理'
      }
    }
  ];
};

const PlayerManagement = ({ location }) => {
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
      const response = await getPlayerList(newParams);
      setUsers(response?.data);
      setPagination({
        ...pagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
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

  return (
    <>
      <HeaderTitle title="参加者管理" />
      <div className="main-container player-management">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="player-management__content">
          <BusinessPlayerTable
            data={users}
            onPageChange={onPageChange}
            pagination={pagination}
            loading={loading}
            delUserSuccess={delUserSuccess}
            isBusiness
            pageSize={NUM_PER_PAGE}
          />
          <PlayerFilterSearch
            onSearchUser={onSearchUser}
            fetchUsers={fetchUsers}
            setCurrentParams={setCurrentParams}
          />
        </div>
      </div>
    </>
  );
};

export default PlayerManagement;

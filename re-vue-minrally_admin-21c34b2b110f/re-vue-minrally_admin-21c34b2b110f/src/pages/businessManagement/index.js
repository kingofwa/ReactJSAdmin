import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import BusinessTab from './elements/BusinessTab';
import FilterSearch from './elements/FilterSearch';
import moment from 'moment';
import { DATE_LINE } from '@utils/date';
import { NUM_PER_PAGE } from '@config/constants';
import { getBusiness, deleteBusiness } from '@api/business';
import { get } from 'lodash';
import Scroll from 'react-scroll';
import { message } from 'antd';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import './styles.scss';

const BusinessManagement = ({ location }) => {
  const scroll = Scroll.animateScroll;
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });
  const [currentParams, setCurrentParams] = useState({});

  const onPageChange = newPage => {
    fetchBusiness(newPage, currentParams);
  };

  const fetchBusiness = async (page = 1, params = {}) => {
    try {
      setLoading(true);
      const newParams = { ...params, page, per: NUM_PER_PAGE };
      const response = await getBusiness(newParams);
      setBusiness(response?.data);
      setPagination({
        ...pagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
      scroll.scrollToTop();
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearchBusiness = async values => {
    const params = {};
    const email = get(values, 'email', null);
    const business_name = get(values, 'business_name', null);
    const person_in_charge_name = get(values, 'person_in_charge_name', null);
    const startDate = get(values, ['period', 'startDate'], null);
    const endDate = get(values, ['period', 'endDate'], null);
    if (business_name) {
      params.business_name = business_name;
    }
    if (email) {
      params.email = email;
    }
    if (person_in_charge_name) {
      params.person_in_charge_name = person_in_charge_name;
    }
    if (startDate) {
      params.start_date = moment(startDate).format(DATE_LINE);
    }
    if (endDate) {
      params.end_date = moment(endDate).format(DATE_LINE);
    }

    setCurrentParams(params);
    fetchBusiness(1, params);
  };

  useEffect(() => {
    fetchBusiness();
    // eslint-disable-next-line
  }, []);

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: null,
          breadcrumbName: '事業者管理'
        }
      }
    ];
  };

  const onDeleteBusiness = async id => {
    try {
      await deleteBusiness(id);
      fetchBusiness(pagination?.current);
      pushMessage(MESSAGES.deleteSuccess);
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <>
      <HeaderTitle title="事業者管理" isBusiness />
      <div className="main-container business">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="business-content">
          <BusinessTab
            data={business}
            onPageChange={onPageChange}
            pagination={pagination}
            loading={loading}
            onDeleteBusiness={onDeleteBusiness}
          />
          <FilterSearch
            onSearchBusiness={onSearchBusiness}
            fetchBusiness={fetchBusiness}
            setCurrentParams={setCurrentParams}
          />
        </div>
      </div>
    </>
  );
};

export default BusinessManagement;

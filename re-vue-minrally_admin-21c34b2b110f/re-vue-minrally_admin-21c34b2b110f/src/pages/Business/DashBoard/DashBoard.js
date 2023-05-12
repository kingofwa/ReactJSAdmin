import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import { DATE_LINE } from '@utils/date';
import { getStatistics } from '@api/dashboard';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import CustomButton from '@components/buttons/custom-button';
import { DateRangeInput, CustomForm } from '@components/form';
import HeaderTitle from '@components/HeaderTitle';
import GrandRallyRankingTab from './elements/GrandRallyRankingTab';
import SpotRankingTab from './elements/SpotRankingTab';
import RallyRankingTab from './elements/RallyRankingTab';
import { DASH_BOARD_SORT_TYPE_ENUM, ORDER } from '@config/constants';
import './styles.scss';

const BusinessDashBoardPage = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({});
  const [dateRange, setDateRange] = useState({});
  const [sortParams, setSortParams] = useState({
    sort_series: '-players_count',
    sort_games: '-players_count',
    sort_spots: '-players_checked_count'
  });

  const onMatchedRoutes = matchedRoutes => {
    return [...matchedRoutes];
  };

  const fetchStatistics = async params => {
    try {
      setLoading(true);
      const response = await getStatistics(params);
      setStatistics(response);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFilter = values => {
    const startDate = get(values, ['period', 'startDate'], null);
    const endDate = get(values, ['period', 'endDate'], null);
    if (startDate && endDate) {
      const params = {
        start_date: moment(startDate).format(DATE_LINE),
        end_date: moment(endDate).format(DATE_LINE)
      };
      setDateRange(params);
      fetchStatistics({ ...sortParams, ...params });
    } else if (!startDate && !endDate) {
      setDateRange({});
      fetchStatistics(sortParams);
    }
  };

  const getShortOrder = (field, order) => {
    if (order === ORDER.DESCEND) {
      return `-${field}`;
    } else if (order === ORDER.ASCEND) {
      return field;
    }
    return null;
  };

  const onSortStatistics = (field, order, type) => {
    if (type === DASH_BOARD_SORT_TYPE_ENUM.GRAND_RALLY) {
      let sort = { ...sortParams, sort_series: getShortOrder(field, order) };
      let params = { ...dateRange, ...sort };
      setSortParams({
        ...sortParams,
        ...sort
      });
      fetchStatistics(params);
    }
    if (type === DASH_BOARD_SORT_TYPE_ENUM.RALLY) {
      let sort = { ...sortParams, sort_games: getShortOrder(field, order) };
      let params = { ...dateRange, ...sort };
      setSortParams({
        ...sortParams,
        ...sort
      });
      fetchStatistics(params);
    }
    if (type === DASH_BOARD_SORT_TYPE_ENUM.SPOT) {
      let sort = { ...sortParams, sort_spots: getShortOrder(field, order) };
      let params = { ...dateRange, ...sort };
      setSortParams({
        ...sortParams,
        ...sort
      });
      fetchStatistics(params);
    }
  };

  useEffect(() => {
    fetchStatistics(sortParams);
    // eslint-disable-next-line
  }, []);

  const renderWidgetItem = (label, number) => {
    return (
      <div className="widget-item">
        <label className="widget-item-label">{label}</label>
        <div className="widget-item-info">{number}</div>
      </div>
    );
  };

  const renderWidget = () => {
    const number_of_users = get(statistics, [
      'statistic_info',
      'number_of_users'
    ]);
    const number_of_spots = get(statistics, [
      'statistic_info',
      'number_of_spots'
    ]);
    const number_of_check_ins = get(statistics, [
      'statistic_info',
      'number_of_check_ins'
    ]);
    return (
      <div className="widget">
        {renderWidgetItem('総参加者数', number_of_users)}
        {renderWidgetItem('総スポット数', number_of_spots)}
        {renderWidgetItem('総チェックイン数', number_of_check_ins)}
      </div>
    );
  };

  const renderStatisticalData = () => {
    return (
      <div className="card">
        <div className="card-title">統計データ</div>
        <div className="card-body">
          <CustomForm
            name="login"
            onFinish={onFilter}
            autoComplete="off"
            className="statistical-form"
          >
            <label className="statistical-form-label">期間</label>
            <DateRangeInput name="period" allowClear />
            <CustomButton
              htmlType="submit"
              type="primary"
              className="btn-search"
            >
              更新
            </CustomButton>
          </CustomForm>
          {renderWidget()}
          <GrandRallyRankingTab
            data={statistics?.serie_statistics || []}
            loading={loading}
            onSortStatistics={onSortStatistics}
          />
          <RallyRankingTab
            data={statistics?.games_statistics || []}
            loading={loading}
            onSortStatistics={onSortStatistics}
          />
          <SpotRankingTab
            data={statistics?.spots_statistics || []}
            loading={loading}
            onSortStatistics={onSortStatistics}
          />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <>
        <HeaderTitle title="ダッシュボード" />
        <div className="main-container dash-board-page">
          <AdminBreadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          {renderStatisticalData()}
        </div>
      </>
    );
  };

  return <>{renderContent()}</>;
};

export default BusinessDashBoardPage;

import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import CustomButton from '@components/buttons/custom-button';
import { DateRangeInput, CustomForm } from '@components/form';
import HeaderTitle from '@components/HeaderTitle';
import HashtagRankingTab from './elements/HashtagRankingTab';
import RallyRankingTab from './elements/RallyRankingTab';
import { getStatistics } from '@api/dashboard';
import { getCreator } from '@api/creator';
import { Spin } from 'antd';
import { get, includes } from 'lodash';
import moment from 'moment';
import { DATE_LINE } from '@utils/date';
import './styles.scss';

const DashBoard = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({});
  const [loadingTab, setLoadingTab] = useState(false);
  const [sortParams, setSortParams] = useState({});
  const [creators, setCreator] = useState([]);
  const onMatchedRoutes = matchedRoutes => {
    return [...matchedRoutes];
  };

  const onFilter = values => {
    const startDate = get(values, ['period', 'startDate'], null);
    const endDate = get(values, ['period', 'endDate'], null);
    if (startDate && endDate) {
      const params = {
        ...sortParams,
        start_date: moment(startDate).format(DATE_LINE),
        end_date: moment(endDate).format(DATE_LINE)
      };
      setSortParams(params);
      fetchStatistics(params);
    }
  };

  const fetchStatistics = async params => {
    try {
      setLoadingTab(true);
      const response = await getStatistics(params);
      setStatistics(response);
    } catch (error) {
      //
    } finally {
      setLoadingTab(false);
    }
  };

  const fetchInitData = async () => {
    try {
      setLoading(true);
      const params = {
        sort_hashtags: '-searching_count',
        sort_rallies: '-player_count'
      };
      setSortParams(params);
      const statisticsData = await getStatistics(params);
      setStatistics(statisticsData);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  const onSortStatistics = (key, type) => {
    let params = { ...sortParams };
    const hashtagsKey = ['searching_count', 'taggings_count'];
    if (includes(hashtagsKey, key)) {
      const sortHashtags = type === 'descend' ? `-${key}` : key;
      params = { ...params, sort_hashtags: sortHashtags };
    } else {
      const sortRallies = type === 'descend' ? `-${key}` : key;
      params = { ...params, sort_rallies: sortRallies };
    }
    setSortParams(params);
    fetchStatistics(params);
  };

  const fetchCreator = async (page = 1) => {
    try {
      setLoading(true);
      const newParams = { status: 'submitted' };
      const response = await getCreator(newParams);
      setCreator(response?.data);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitData();
    fetchCreator();
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
    const number_of_check_ins = get(statistics, [
      'statistic_info',
      'number_of_check_ins'
    ]);
    const number_of_rallies = get(statistics, [
      'statistic_info',
      'number_of_rallies'
    ]);
    const number_of_rally_masters = get(statistics, [
      'statistic_info',
      'number_of_rally_masters'
    ]);
    return (
      <div className="widget">
        {renderWidgetItem('ユーザー数', number_of_users)}
        {renderWidgetItem('ラリーマスター数', number_of_rally_masters)}
        {renderWidgetItem('ラリー数', number_of_rallies)}
        {renderWidgetItem('チェックイン数', number_of_check_ins)}
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
          {statistics && (
            <>
              <HashtagRankingTab
                data={statistics?.hashtags_ranking || []}
                loading={loadingTab}
                onSortStatistics={onSortStatistics}
              />
              <RallyRankingTab
                data={statistics?.rallies_ranking || []}
                loading={loadingTab}
                onSortStatistics={onSortStatistics}
              />
            </>
          )}
        </div>
      </div>
    );
  };

  const renderNotification = () => {
    if (creators.length > 0) {
      return (
        <p className="dash-board-notification">
          <a
            href="/master-application-list"
            className="dash-board-notification"
          >
            新しいラリーマスター申請があります。
          </a>
        </p>
      );
    }
  };

  const renderContent = () => {
    if (loading) {
      return null;
    }
    return (
      <>
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        {renderNotification()}
        {renderStatisticalData()}
      </>
    );
  };

  return (
    <>
      <HeaderTitle title="ダッシュボード" />
      <div className="main-container dash-board">
        <Spin spinning={loading} className="custom-spinner">{renderContent()}</Spin>
      </div>
    </>
  );
};

export default DashBoard;

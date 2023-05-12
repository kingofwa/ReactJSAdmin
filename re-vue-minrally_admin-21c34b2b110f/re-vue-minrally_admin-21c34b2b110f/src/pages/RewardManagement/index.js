import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import { PATHS } from '@config/paths';
import { Form, message, Spin, Upload } from 'antd';
import {
  getBusinessDetail,
  getBusinessGames,
  getBusinessSeries
} from '@api/business';
import useQuery from '@utils/useQuery';
import { isNull } from 'lodash';
import { deleteSeries } from '@api/series';
import { deleteEvent } from '@api/event';
import { useHistory } from 'react-router-dom';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import RewardAnalysisTable from '@components/Reward/RewardAnalysisTable';
import SeriesRewardTable from '@components/Reward/SeriesRewardTable';
import RallyRewardTable from '@components/Reward/RallyRewardTable';
import './styles.scss';

const NUM_PER_PAGE = 5;

const RewardManagement = ({ location }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const query = useQuery();
  const operatorId = query.get('id');
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  // const [imageFile, setImageFile] = useState();
  const [businessAvatar, setBusinessAvatar] = useState();
  const [series, setSeries] = useState();
  const [games, setGames] = useState();
  const [analysisPagination, setAnalysisPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [rallyLoading, setRallyLoading] = useState(false);
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [isCouponRally, setIsCouponRally] = useState(false);
  const [isCouponSeries, setIsCouponSeries] = useState(false);

  const [seriesPagination, setSeriesPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });

  const [rallyPagination, setRallyPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });
  const [preRelatedLinks, setPreRelatedLinks] = useState([]);

  const [isUpload, setIsUpload] = useState(false);

  const onChangeSeriesPage = newPage => {
    //fetchSeries(newPage);
  };

  const onChangeRallyPage = newPage => {
    //fetchGames(newPage);
  };

  const onChangeAnalysisPage = newPage => {
    //fetchGames(newPage);
  };

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.business.rewardManagement,
          breadcrumbName: '報酬管理'
        }
      }
    ];
  };

  const handleChangeTabRally = () => {
    setIsCouponRally(!isCouponRally);
  };

  const handleChangeTabSeries = () => {
    setIsCouponSeries(!isCouponSeries);
  };

  // const fetchSeries = async (page = 1) => {
  //   try {
  //     setSeriesLoading(true);
  //     const response = await getBusinessSeries(operatorId, {
  //       page,
  //       per: NUM_PER_PAGE
  //     });
  //     setSeries(response?.data);
  //     setSeriesPagination({
  //       ...seriesPagination,
  //       total: response?.meta?.count,
  //       current: response?.meta?.page
  //     });
  //   } catch (error) {
  //     message.error(error);
  //   } finally {
  //     setSeriesLoading(false);
  //   }
  // };

  // const fetchGames = async (page = 1) => {
  //   try {
  //     setGamesLoading(true);
  //     const response = await getBusinessGames(operatorId, {
  //       page,
  //       per: NUM_PER_PAGE
  //     });
  //     setGames(response?.data);
  //     setGamesPagination({
  //       ...gamesPagination,
  //       total: response?.meta?.count,
  //       current: response?.meta?.page
  //     });
  //   } catch (error) {
  //     message.error(error);
  //   } finally {
  //     setGamesLoading(false);
  //   }
  // };

  // const fetchBusinessDetail = async () => {
  //   try {
  //     const response = await getBusinessDetail(operatorId);
  //     setData(response);
  //     let photos = null;
  //     let hasPhotos = !isNull(response?.profile_image_url);
  //     if (hasPhotos) {
  //       setBusinessAvatar(response?.profile_image_url);
  //     }
  //     setPreRelatedLinks(response?.related_links);

  //     form.setFieldsValue({
  //       business_name: response?.business_name,
  //       department_name: response?.department_name,
  //       person_in_charge_name: response?.person_in_charge_name,
  //       email: response?.email,
  //       sex: response?.sex,
  //       year_of_birth: response?.year_of_birth,
  //       information: response?.information,
  //       photos: photos?.originFileObj,
  //       related_links_attributes: response?.related_links,
  //       profession: response?.profession
  //     });
  //   } catch (error) {
  //     message.error({ content: error, duration: 10 });
  //   }
  // };

  const getInitData = async () => {
    try {
      setLoading(true);
      setAnalysisPagination({
        total: 5,
        current: 1
      });

      setRallyPagination({
        total: 5,
        current: 1
      });

      setSeriesPagination({
        total: 5,
        current: 1
      });
      //await Promise.all([fetchBusinessDetail(), fetchSeries(), fetchGames()]);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  // const scroll = Scroll.animateScroll;

  useEffect(() => {
    getInitData();
    // scroll.scrollToTop();
    // eslint-disable-next-line
  }, []);

  const coupon_mock = [
    {
      id: 1,
      coupon_name: '田園都市線ラリー1',
      rally_name: '田園都市線ラリー1',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 2,
      coupon_name: '田園都市線ラリー2',
      rally_name: '田園都市線ラリー2',
      expiration_date: null,
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 3,
      coupon_name: '田園都市線ラリー3',
      rally_name: '田園都市線ラリー3',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 4,
      coupon_name: '田園都市線ラリー4',
      rally_name: '田園都市線ラリー4',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 5,
      coupon_name: '田園都市線ラリー5',
      rally_name: '田園都市線ラリー5',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 6,
      coupon_name: '田園都市線ラリー6',
      rally_name: '田園都市線ラリー6',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    }
  ];
  const form_mock = [
    {
      id: 1,
      coupon_name: '田園都市線ラリー1',
      number_of_spots: '田園都市線ラリー1',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 2,
      coupon_name: '田園都市線ラリー2',
      number_of_spots: '田園都市線ラリー2',
      expiration_date: null,
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 3,
      coupon_name: '田園都市線ラリー3',
      number_of_spots: '田園都市線ラリー3',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 4,
      coupon_name: '田園都市線ラリー4',
      number_of_spots: '田園都市線ラリー4',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 5,
      coupon_name: '田園都市線ラリー5',
      number_of_spots: '田園都市線ラリー5',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 6,
      coupon_name: '田園都市線ラリー6',
      number_of_spots: '田園都市線ラリー6',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    }
  ];

  const data = [
    {
      id: 1,
      coupon_name: '田園都市線ラリー1',
      spot_name: '田園都市線ラリー1',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 2,
      coupon_name: '田園都市線ラリー2',
      spot_name: '田園都市線ラリー2',
      expiration_date: null,
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 3,
      coupon_name: '田園都市線ラリー3',
      spot_name: '田園都市線ラリー3',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 4,
      coupon_name: '田園都市線ラリー4',
      spot_name: '田園都市線ラリー4',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 5,
      coupon_name: '田園都市線ラリー5',
      spot_name: '田園都市線ラリー5',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    },
    {
      id: 6,
      coupon_name: '田園都市線ラリー6',
      spot_name: '田園都市線ラリー6',
      expiration_date: '2022/05/17',
      number_of_finishers: 2,
      number_of_uses: 2,
      number_of_issues: 2
    }
  ];

  return (
    <>
      <HeaderTitle title="報酬管理" />
      <div className="main-container business-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="business-detail-content">
          <Spin spinning={loading} className="custom-spinner">
            <RewardAnalysisTable
              data={data}
              onPageChange={onChangeAnalysisPage}
              pagination={analysisPagination}
              loading={analysisLoading}
            />
            <SeriesRewardTable
              data={!isCouponSeries ? coupon_mock : form_mock}
              onPageChange={onChangeSeriesPage}
              pagination={seriesPagination}
              loading={seriesLoading}
              onChangeTab={handleChangeTabSeries}
              isCoupon={isCouponSeries}
            />
            <RallyRewardTable
              data={!isCouponRally ? coupon_mock : form_mock}
              onPageChange={onChangeRallyPage}
              onChangeTab={handleChangeTabRally}
              isCoupon={isCouponRally}
              pagination={rallyPagination}
              loading={rallyLoading}
            />
          </Spin>
        </div>
      </div>
    </>
  );
};

export default RewardManagement;

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
import { useHistory } from 'react-router-dom';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import RewardDetailTable from '@components/RewardDetail';
import './styles.scss';

const NUM_PER_PAGE = 5;

const RewardManagementDetail = ({ location }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const query = useQuery();
  const rewardId = query.get('id');
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });

  const onPageChange = newPage => {
    //fetchSeries(newPage);
  };

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.business.rewardManagementDetail,
          breadcrumbName: '報酬管理>グランドラリー完走報酬>応募フォーム'
        }
      }
    ];
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
      setPagination({
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

  const rewardDetailMock = {
    columns: [
      {
        title: 'ユーザー名'
      },
      {
        title: '申込日'
      },
      {
        title:
          '質問1質問質問1質問質問1質問質問1質問質問1質問質問1質問質問1質問質問1質問'
      },
      {
        title: '質問1質問質問1質問質問1質問質問1質問質問1質問質問1質問'
      },
      {
        title: '質問1質問質問1質問質問1質問質問1質問'
      },
      {
        title: '質問1質問質問1質問'
      },
      {
        title: '質問1質問質問1質問'
      },
      {
        title: '質問1質問質問1質問'
      },
      {
        title: '質問1質問質問1質問'
      },
      {
        title: '質問1質問質問1質問'
      }
    ],
    data: [
      {
        items: [
          '質問1',
          'example@mail.comexample@mail.com',
          '質問3',
          '質問4',
          '質問5',
          '質問6',
          '質問7',
          '質問8',
          '質問9',
          '質問10'
        ]
      },
      {
        items: [
          '質問2',
          'example@mail.come xample@mail.comexample@mail.com example@mail.com',
          '質問3',
          '質問4',
          '質問5',
          '質問6',
          '質問7',
          '質問8',
          '質問9',
          '質問10'
        ]
      }
    ]
  };

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
            <RewardDetailTable
              columns={rewardDetailMock.columns}
              data={rewardDetailMock.data}
              onPageChange={onPageChange}
              pagination={pagination}
              loading={loading}
            />
          </Spin>
        </div>
      </div>
    </>
  );
};

export default RewardManagementDetail;

import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import SeriesInfoForm from '@components/Series/SeriesInfoForm';
import { transformData } from '@components/form/CouponFormInput/transformData';
import { PATHS } from '@config/paths';
import { Form, message } from 'antd';
import { getSeriesDetail, getSeriesGames, updateSeries } from '@api/series';
import useQuery from '@utils/useQuery';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import { deleteRallyEvent } from '@api/event';
import { map } from 'lodash';
import { DEFAULT_TEMPLATE_CERTIFICATE, MESSAGE_TYPE } from '@config/constants';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import { PHOTO } from '@config/constants';
import SeriesAnalysis from '@components/GrandRally/SeriesAnalysis';
import EventManagementTable from '@components/GrandRally/EventManagementTable';
import Loading from '@components/Loading';
import { PeriodSetingEnum } from '@config/constants';
import { dataSerialization } from '@utils/form';
// import { getFormRewardData } from '@utils/helper';
import './styles.scss';

const NUM_PER_PAGE = 5;

const GrandRallyDetail = ({ location }) => {
  const [form] = Form.useForm();
  const query = useQuery();
  const seriesId = query.get('id');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });
  const [games, setGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(false);
  const [seriesDetail, setSeriesDetail] = useState();
  const [tagList, setTagList] = useState([]);
  const [certificate, setCertificate] = useState(DEFAULT_TEMPLATE_CERTIFICATE);
  const [topPhoto, setTopPhoto] = useState();
  const [googlePhoto, setGooglePhoto] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [seriesData, setSeriesData] = useState();
  const [businessName, setBusinessName] = useState();
  const [couponInfo, setCouponInfo] = useState();

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.business.grandRallyManagement,
          breadcrumbName: 'グランドラリー管理'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: seriesDetail?.name
        }
      }
    ];
  };

  const onChangeRallyList = games => {
    const games_ids = map(games, game => game?.id);
    const currentData = form.getFieldsValue();
    form.setFieldsValue({ ...currentData, games_ids });
  };

  const fetchSeriesDetail = async () => {
    try {
      const response = await getSeriesDetail(seriesId);
      const seriesData = response?.data;
      setTagList(seriesData?.tag_list);
      setBusinessName(response?.extra?.operator?.name);
      setCouponInfo(seriesData?.coupon_reward_template);
      if (seriesData?.top_photo_url) {
        setTopPhoto({ name: 'topPhoto', url: seriesData?.top_photo_url });
      }
      if (seriesData?.google_image_url) {
        setGooglePhoto({
          name: 'googlePhoto',
          url: seriesData?.google_image_url
        });
      }
      const seriesInfo = {
        name: seriesData?.name,
        description: seriesData?.description,
        registration_date: moment(seriesData?.registration_date).format(
          DATE_DEFAULT
        ),
        certificate_image_template: seriesData?.certificate_image_template,
        games_ids: seriesData?.games_ids,
        reward_template_id: seriesData?.reward?.reward_template_id,
        // photos: photos?.originFileObj,
        tag_list: seriesData?.tag_list
      };

      if (seriesData?.start_date && seriesData?.end_date) {
        seriesInfo.periodSetting = PeriodSetingEnum.LIMITED;
      } else {
        seriesInfo.periodSetting = PeriodSetingEnum.UNLIMITED;
      }
      const startDate = seriesData?.start_date
        ? moment(seriesData?.start_date)
        : null;
      const endDate = seriesData?.end_date
        ? moment(seriesData?.end_date)
        : null;
      if (startDate && endDate) {
        seriesInfo.period = {
          start_date: startDate,
          end_date: endDate
        };
      }
      setSeriesData(seriesInfo);

      form.setFieldsValue(seriesInfo);

      setSeriesDetail(seriesData);
      if (seriesData?.certificate_image_template) {
        setCertificate(seriesData?.certificate_image_template);
      }
    } catch (error) {
      message.error(error);
    }
  };

  const fetchSeriesGames = async (page = 1) => {
    try {
      setGamesLoading(true);
      const response = await getSeriesGames(seriesId, {
        page,
        per: NUM_PER_PAGE
      });
      setPagination({
        ...pagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
      setGames(response?.data);
    } catch (error) {
      //
    } finally {
      setGamesLoading(false);
    }
  };

  const onPageChange = newPage => {
    fetchSeriesGames(newPage);
  };

  const getInitData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchSeriesDetail(), fetchSeriesGames()]);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seriesId) {
      getInitData();
    }
    // eslint-disable-next-line
  }, [seriesId]);

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const data = form.getFieldValue();
      const startDate = moment(values?.period?.start_date).format(DATE_DEFAULT);
      const endDate = moment(values?.period?.end_date).format(DATE_DEFAULT);
      const params = {
        name: values?.name,
        description: values?.description,
        tags: values?.tag_list,
        start_date: values?.period ? startDate : '',
        end_date: values?.period ? endDate : '',
        certificate_image_template_attributes: certificate
      };
      // const formData = getFormRewardData(values);
      const couponData = await transformData(data);
      if (couponData) {
        params.coupon_reward_template_attributes = couponData;
      } else {
        if (couponInfo) {
          params.coupon_reward_template_attributes = {
            id: couponInfo.id,
            _destroy: true
          };
        }
      }
      if (values.photos) {
        if (values.photos === PHOTO.delete) {
          params.top_photo = null;
        } else {
          params.top_photo = values.photos;
        }
      }
      const payload = await dataSerialization(params);
      await updateSeries(seriesId, payload);
      pushMessage(MESSAGES.updateSuccess);
    } catch (error) {
      pushMessage(error, MESSAGE_TYPE.ERROR);
    } finally {
      setIsSubmit(false);
    }
  };

  const onDelGame = async id => {
    try {
      await deleteRallyEvent(seriesId, id);
      fetchSeriesGames(pagination?.current);
      pushMessage(MESSAGES.deleteSuccess);
    } catch (error) {
      message.error(error);
    }
  };

  const handleUpdateRallyList = async () => {
    try {
      const data = form.getFieldValue();
      const params = {};
      params.games_ids = data?.games_ids;
      const payload = await dataSerialization(params);
      await updateSeries(seriesId, payload);
      getInitData();
    } catch (error) {
      message.error(error);
    }
  };

  const renderForm = () => {
    return (
      <SeriesInfoForm
        form={form}
        onSubmit={onSubmit}
        isEdit
        tagList={tagList}
        certificate={certificate}
        setCertificate={setCertificate}
        topPhoto={topPhoto}
        googlePhoto={googlePhoto}
        isSubmit={isSubmit}
        seriesData={seriesData}
        couponInfo={couponInfo}
        businessName={businessName}
        isBusiness
      />
    );
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <HeaderTitle title="東急電鉄株式会社 - 東急電鉄ラリー" />
      <div className="main-container series-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="series-detail-content">
          {renderForm()}
          <EventManagementTable
            data={games}
            onPageChange={onPageChange}
            pagination={pagination}
            loading={gamesLoading}
            onDelGame={onDelGame}
            handleUpdateRallyList={handleUpdateRallyList}
            onChangeRallyList={onChangeRallyList}
            isBusiness
          />
          <SeriesAnalysis isBusiness />
        </div>
      </div>
    </>
  );
};

export default GrandRallyDetail;

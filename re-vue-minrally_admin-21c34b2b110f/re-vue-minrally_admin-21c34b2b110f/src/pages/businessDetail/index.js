import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import BusinessInfoForm from '@components/Business/BusinessInfoForm';
import { PATHS } from '@config/paths';
import { Form, message, Spin, Upload } from 'antd';
import {
  getBusinessDetail,
  updateBusinessInfo,
  getBusinessGames,
  getBusinessSeries,
  uploadCSV
} from '@api/business';
import useQuery from '@utils/useQuery';
import { generateFormData } from '@utils/form';
import { isNull } from 'lodash';
import { deleteSeries } from '@api/series';
import { deleteEvent } from '@api/event';
import CustomButton from '@components/buttons/custom-button';
import { formatRelatedLinks } from '@utils/helper';
import { useHistory } from 'react-router-dom';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import BusinessSeriesTable from '@components/Business/BusinessSeriesTable';
import BusinessRallyTable from '@components/Business/BusinessRallyTable';
import './styles.scss';

const NUM_PER_PAGE = 5;

const BusinessDetail = ({ location }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const query = useQuery();
  const operatorId = query.get('id');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const [imageFile, setImageFile] = useState();
  const [businessAvatar, setBusinessAvatar] = useState();
  const [series, setSeries] = useState();
  const [games, setGames] = useState();
  const [seriesPagination, setSeriesPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });
  const [seriesLoading, setSeriesLoading] = useState(false);
  const [gamesLoading, setGamesLoading] = useState(false);

  const [gamesPagination, setGamesPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });
  const [preRelatedLinks, setPreRelatedLinks] = useState([]);

  const [isUpload, setIsUpload] = useState(false);

  const onChangeSeriesPage = newPage => {
    fetchSeries(newPage);
  };

  const onChangeGamesPage = newPage => {
    fetchGames(newPage);
  };

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.businessManagement,
          breadcrumbName: '事業者管理'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: data?.business_name
        }
      }
    ];
  };

  const fetchSeries = async (page = 1) => {
    try {
      setSeriesLoading(true);
      const response = await getBusinessSeries(operatorId, {
        page,
        per: NUM_PER_PAGE
      });
      setSeries(response?.data);
      setSeriesPagination({
        ...seriesPagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
    } catch (error) {
      message.error(error);
    } finally {
      setSeriesLoading(false);
    }
  };

  const onDelSeries = async id => {
    try {
      setSeriesLoading(true);
      await deleteSeries(id);
      fetchSeries(seriesPagination?.current);
      pushMessage(MESSAGES.deleteSuccess);
    } catch (error) {
      message.error(error);
    } finally {
      setSeriesLoading(false);
    }
  };

  const onDelGame = async id => {
    try {
      setGamesLoading(true);
      await deleteEvent(id);
      fetchGames(gamesPagination?.current);
    } catch (error) {
      message.error(error);
    } finally {
      setGamesLoading(false);
    }
  };

  const fetchGames = async (page = 1) => {
    try {
      setGamesLoading(true);
      const response = await getBusinessGames(operatorId, {
        page,
        per: NUM_PER_PAGE
      });
      setGames(response?.data);
      setGamesPagination({
        ...gamesPagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
    } catch (error) {
      message.error(error);
    } finally {
      setGamesLoading(false);
    }
  };

  const fetchBusinessDetail = async () => {
    try {
      const response = await getBusinessDetail(operatorId);
      setData(response);
      let photos = null;
      let hasPhotos = !isNull(response?.profile_image_url);
      if (hasPhotos) {
        setBusinessAvatar(response?.profile_image_url);
      }
      setPreRelatedLinks(response?.related_links);

      form.setFieldsValue({
        business_name: response?.business_name,
        department_name: response?.department_name,
        person_in_charge_name: response?.person_in_charge_name,
        email: response?.email,
        sex: response?.sex,
        year_of_birth: response?.year_of_birth,
        information: response?.information,
        photos: photos?.originFileObj,
        related_links_attributes: response?.related_links,
        profession: response?.profession
      });
    } catch (error) {
      message.error({ content: error, duration: 10 });
    }
  };

  const getInitData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchBusinessDetail(), fetchSeries(), fetchGames()]);
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
  }, [operatorId]);

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const relatedLinksAttributes = values?.related_links_attributes?.filter(
        item => item.name && item.url
      );

      const params = {
        business_name: values?.business_name,
        department_name: values?.department_name,
        person_in_charge_name: values?.person_in_charge_name,
        email: values?.email,
        information: values?.information,
        sex: values?.sex,
        year_of_birth: values?.year_of_birth,
        related_links_attributes: formatRelatedLinks(
          preRelatedLinks,
          relatedLinksAttributes
        ),
        profession: values?.profession
      };
      if (values?.photos) {
        params.profile_image = values?.photos;
      }
      const payload = await generateFormData(params);
      const response = await updateBusinessInfo(operatorId, payload);
      if (response) {
        setData(response);
        pushMessage(MESSAGES.updateSuccess);
        history.push(PATHS.businessManagement);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  const onUploadCSV = async info => {
    try {
      setIsUpload(true);
      const params = {
        csv_file: info.file
      };
      const payload = generateFormData(params);
      const response = await uploadCSV(operatorId, payload);
      if (response?.status === 'success') {
        pushMessage(MESSAGES.uploadSuccess);
        getInitData();
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsUpload(false);
    }
  };

  const beforeUploadCSV = file => false;

  return (
    <>
      <HeaderTitle title="東急電鉄株式会社" />
      <div className="main-container business-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="business-detail-content">
          <Spin spinning={loading || isUpload} className="custom-spinner">
            <BusinessInfoForm
              form={form}
              onSubmit={onSubmit}
              businessAvatar={businessAvatar}
              isSubmit={isSubmit}
              isEdit
            />
            <BusinessSeriesTable
              data={series}
              onPageChange={onChangeSeriesPage}
              pagination={seriesPagination}
              loading={seriesLoading}
              onDelSeries={onDelSeries}
              businessId={data?.id}
            />
            <BusinessRallyTable
              data={games}
              onPageChange={onChangeGamesPage}
              pagination={gamesPagination}
              loading={gamesLoading}
              onDelGame={onDelGame}
              businessId={operatorId}
            />
            <div className="business-detail-action">
              <Upload
                onChange={onUploadCSV}
                maxCount={1}
                accept=".csv"
                beforeUpload={beforeUploadCSV}
                className="business-detail-upload"
              >
                <CustomButton>CSVアップロード</CustomButton>
              </Upload>
            </div>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default BusinessDetail;

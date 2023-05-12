import React, { useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import BusinessSeriesTable from '@components/Business/BusinessSeriesTable';
import CustomButton from '@components/buttons/custom-button';
import { deleteSeries } from '@api/series';
import { getGrandRally } from '@api/business';
import { MESSAGES } from '@config/messages';
import { pushMessage } from '@utils/main';
import './styles.scss';

const NUM_PER_PAGE = 20;

const GrandRallyManagement = ({ location }) => {
  const [series, setSeries] = useState();
  const [seriesPagination, setSeriesPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: null,
          breadcrumbName: 'グランドラリー管理'
        }
      }
    ];
  };

  useEffect(() => {
    fetchSeries();
    // eslint-disable-next-line
  }, []);

  const fetchSeries = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await getGrandRally({
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
      setIsLoading(false);
    }
  };

  const onChangeSeriesPage = newPage => {
    fetchSeries(newPage);
  };

  const onDelSeries = async id => {
    try {
      setIsLoading(true);
      await deleteSeries(id);
      fetchSeries(seriesPagination?.current);
      pushMessage(MESSAGES.deleteSuccess);
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const beforeUploadCSV = file => false;

  const onUploadCSV = async info => {
    try {
      setIsUpload(true);
      // const params = {
      //   csv_file: info.file
      // };
      // const payload = generateFormData(params);
      // const response = await uploadCSV(operatorId, payload);
      // if (response?.status === 'success') {
      //   pushMessage(MESSAGES.uploadSuccess);
      //   getInitData();
      // }
    } catch (error) {
      message.error(error);
    } finally {
      setIsUpload(false);
    }
  };

  return (
    <>
      <HeaderTitle title="グランドラリー管理" />
      <div className="main-container business-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="business-detail-content">
          <BusinessSeriesTable
            data={series}
            onPageChange={onChangeSeriesPage}
            pagination={seriesPagination}
            loading={isLoading}
            onDelSeries={onDelSeries}
            isBusiness
            pageSize={NUM_PER_PAGE}
          />

          <div className="business-detail-action">
            <Upload
              onChange={onUploadCSV}
              maxCount={1}
              accept=".csv"
              beforeUpload={beforeUploadCSV}
              className="business-detail-upload"
              loading={isUpload}
            >
              <CustomButton>CSVアップロード</CustomButton>
            </Upload>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrandRallyManagement;

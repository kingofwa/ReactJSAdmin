import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import { Form, message } from 'antd';
import BannerTab from './elements/BannerTab';
import { CustomForm } from '@components/form';
import { SubmitButton } from '@components/buttons';
import { getBanners, deleteBanner, updateBannerOrder } from '@api/banners';
import { NUM_PER_PAGE } from '@config/constants';
import { get, map, toNumber } from 'lodash';
import { pushMessage } from '@utils/main';
import { MESSAGES } from '@config/messages';
import './styles.scss';

const formName = 'BannerTable';

const BannerAdministration = ({ location }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: null,
          breadcrumbName: 'バナー管理'
        }
      }
    ];
  };

  const onPageChange = newPage => {
    fetchBanners(newPage);
  };

  const fetchBanners = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getBanners({ page, per: NUM_PER_PAGE });
      setBanners(response?.data);
      setPagination({
        ...pagination,
        total: response?.meta?.count,
        current: response?.meta?.page
      });
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdateOrder = async params => {
    try {
      setIsSubmit(true);
      await updateBannerOrder(params);
      message.success('更新しました。');
      await fetchBanners(pagination?.current);
      form.resetFields();
    } catch (error) {
      message.error('更新できませんでした。');
    } finally {
      setIsSubmit(false);
    }
  };

  const onSubmit = values => {
    const orders = get(values, 'orders', []);
    const orderList = map(orders, order => {
      return {
        id: order?.id,
        order_number: toNumber(order?.order_number)
      };
    });
    const params = { order_number_attributes: orderList };
    onUpdateOrder(params);
  };

  const onDeleteBanner = async id => {
    try {
      await deleteBanner(id);
      fetchBanners(pagination?.current);
      pushMessage(MESSAGES.deleteSuccess);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchBanners();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HeaderTitle title="バナー管理" isBanner />
      <CustomForm
        name={formName}
        autoComplete="off"
        onFinish={onSubmit}
        form={form}
      >
        <div className="main-container banner-management">
          <AdminBreadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />

          <div className="submit-button">
            <SubmitButton text="掲載順更新" loading={isSubmit} />
          </div>
          <div className="banner-content">
            <BannerTab
              loading={loading}
              data={banners}
              onPageChange={onPageChange}
              pagination={pagination}
              onDeleteBanner={onDeleteBanner}
            />
          </div>
        </div>
      </CustomForm>
    </>
  );
};

export default BannerAdministration;

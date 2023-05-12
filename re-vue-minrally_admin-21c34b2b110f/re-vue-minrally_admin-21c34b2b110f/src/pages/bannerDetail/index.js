import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import BannerInfoForm from '@components/BannerInfoForm';
import { PATHS } from '@config/paths';
import { Form, message, Spin } from 'antd';
import { updateBanner, getBannerDetail } from '@api/banners';
import { generateFormData } from '@utils/form';
import useQuery from '@utils/useQuery';
// import { srcToFile } from '@utils/image';
import { useHistory } from 'react-router-dom';
// import { isNull } from 'lodash';
import './styles.scss';

const BannerDetail = ({ location }) => {
  const [form] = Form.useForm();
  const query = useQuery();
  const id = query.get('id');
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();
  const [data, setData] = useState();
  const [imageFile, setImageFile] = useState();

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.bannerAdministration,
          breadcrumbName: 'バナー管理'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'バナー内容確認・編集'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: data?.name
        }
      }
    ];
  };

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const params = {
        name: values?.name,
        url: values?.url,
        status: values?.status
      };
      if (values?.photos) {
        params.image = values?.photos;
      }
      const payload = await generateFormData(params);
      await updateBanner(id, payload);
      message.success('更新しました。');
      history.push(PATHS.bannerAdministration);
    } catch (error) {
      message.error('更新できませんでした。');
    } finally {
      setIsSubmit(false);
    }
  };

  const fetchBannerDetail = async () => {
    try {
      setLoading(true);
      const response = await getBannerDetail(id);
      setData(response);
      // let photos = null;
      // let hasPhotos = !isNull(response?.image_url);
      // if (hasPhotos) {
      // const photos = await srcToFile(response?.image_url);
      // setImageFile(photos);
      setImageFile({ name: 'banner', url: response?.image_url });
      // }
      const info = {
        name: response?.name,
        url: response?.url,
        // photos: photos?.originFileObj,
        status: response?.status
      };
      form.setFieldsValue(info);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerDetail();
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <HeaderTitle title="バナー内容確認・編集" />
      <div className="main-container banner-detail">
        <Spin spinning={loading} className="custom-spinner">
          <AdminBreadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <div className="banner-detail-content">
            <BannerInfoForm
              form={form}
              onSubmit={onSubmit}
              isSubmit={isSubmit}
              imageFile={imageFile}
              data={data}
              loading={loading}
              isEdit
            />
          </div>
        </Spin>
      </div>
    </>
  );
};

export default BannerDetail;

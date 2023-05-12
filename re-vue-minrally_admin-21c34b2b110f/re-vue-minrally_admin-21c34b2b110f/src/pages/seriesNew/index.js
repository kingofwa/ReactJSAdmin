import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import SeriesInfoForm from '@components/Series/SeriesInfoForm';
import { PATHS } from '@config/paths';
import { Form, message, Spin } from 'antd';
import useQuery from '@utils/useQuery';
import { createSeries } from '@api/series';
import { useHistory } from 'react-router-dom';
import { generateFormData } from '@utils/form';
import { DEFAULT_TEMPLATE_CERTIFICATE } from '@config/constants';
import { getBusinessDetail } from '@api/business';
import { pushMessage } from '@utils/main';
import { isEmpty } from 'lodash';
import { MESSAGES } from '@config/messages';
import { transformData } from '@components/form/CouponFormInput/transformData';
import moment from 'moment';
import { DATE_DEFAULT } from '@utils/date';
import './styles.scss';

const SeriesNew = ({ location }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const query = useQuery();
  const businessId = query.get('id');
  const redirectTo = query.get('redirectTo');
  const [certificate, setCertificate] = useState(DEFAULT_TEMPLATE_CERTIFICATE);
  const [businessDetail, setBusinessDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

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
          path: `${PATHS.businessDetail}?id=${businessId}`,
          breadcrumbName: `${businessDetail?.business_name}`
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: 'グランドラリー登録'
        }
      }
    ];
  };

  const onSubmit = async values => {
    try {
      setIsSubmit(true);
      const data = form.getFieldValue();
      const params = {
        name: data?.name,
        description: data?.description,
        tags: data?.tag_list,
        reward_attributes: { reward_template_id: values?.reward_template_id },
        certificate_image_template_attributes: certificate
      };
      if (data?.games_ids) {
        params.games_ids = data?.games_ids;
      }
      const hasPhotos =
        !isEmpty(values?.photos) && typeof values?.photos === 'object';
      if (hasPhotos) {
        params.top_photo = values?.photos;
      }
      const couponData = await transformData(data);
      if (couponData) {
        params.coupon_reward_template_attributes = couponData;
      }

      const startDate = moment(values?.period?.start_date).format(DATE_DEFAULT);
      const endDate = moment(values?.period?.end_date).format(DATE_DEFAULT);
      params.start_date = values?.period ? startDate : '';
      params.end_date = values?.period ? endDate : '';

      const payload = await generateFormData(params, [
        'reward_attributes',
        'coupon_reward_template_attributes',
        'certificate_image_template_attributes'
      ]);
      await createSeries(businessId, payload);
      pushMessage(MESSAGES.createSuccess);
      if (redirectTo) {
        history.push(redirectTo);
      } else {
        history.push(`${PATHS.businessDetail}?id=${businessId}`);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  const fetchBusinessDetail = async () => {
    try {
      setIsLoading(true);
      const response = await getBusinessDetail(businessId);
      setBusinessDetail(response);
      form.setFieldValue({ rallyPeriodSetting: 'no' });
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (businessId) {
      fetchBusinessDetail();
    }
    // eslint-disable-next-line
  }, [businessId]);

  return (
    <>
      <Spin spinning={isLoading} className="custom-spinner">
        <HeaderTitle title="グランドラリー登録" />
        <div className="main-container series-detail">
          <AdminBreadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <div className="series-detail-content">
            <SeriesInfoForm
              form={form}
              onSubmit={onSubmit}
              businessId={businessId}
              certificate={certificate}
              setCertificate={setCertificate}
              businessName={businessDetail?.business_name}
              isCreate
              isEdit={false}
              isSubmit={isSubmit}
            />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default SeriesNew;

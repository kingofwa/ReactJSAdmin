import React, { useEffect, useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import CustomButton from '@components/buttons/custom-button';
import MasterInformation from './elements/MasterInformation';
import PlayerInformation from './elements/PlayerInformation';
import UserInfoForm from './elements/UserInfoForm';
import { PATHS } from '@config/paths';
import { Form, Spin } from 'antd';
import useQuery from '@utils/useQuery';
import { getUserDetail } from '@api/user';
import moment from 'moment-timezone';
import { DATE_NIHON } from '@utils/date';
import './styles.scss';

const UserDetail = ({ location }) => {
  const [form] = Form.useForm();
  const [isPlayerInfo, setIsPlayerInfo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const query = useQuery();
  const id = query.get('id');

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: PATHS.userManagement,
          breadcrumbName: 'ユーザー管理'
        }
      },
      {
        route: {
          path: null,
          breadcrumbName: data?.user_name
        }
      }
    ];
  };

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      const response = await getUserDetail(id);
      setData(response);
      const birthday =
        (response?.birthday &&
          moment(response?.birthday).tz('Asia/Tokyo').format(DATE_NIHON)) ||
        (response?.year_of_birth && `${response.year_of_birth}年`);
      form.setFieldsValue({
        userName: response?.user_name,
        birthDate: birthday,
        gender: response?.sex === 'male' ? '男性' : '女性',
        prefectures: response?.prefecture,
        masterRegister: response?.is_creator ? 'あり' : 'ない',
        fullName: response?.full_name,
        profession: response?.profession,
        email: response?.email
      });
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetail();
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <Spin spinning={loading} className="custom-spinner">
        <HeaderTitle title={data?.user_name} />
        <div className="main-container user-detail">
          <AdminBreadcrumb
            locationPath={location.pathname}
            onMatchedRoutes={onMatchedRoutes}
          />
          <div className="user-detail-content">
            <UserInfoForm form={form} />
            <div className="user-detail-actions">
              <CustomButton
                onClick={() => setIsPlayerInfo(true)}
                className={`${!isPlayerInfo && 'btn-no-select'}`}
              >
                参加者情報
              </CustomButton>
              <CustomButton
                className={`${isPlayerInfo && 'btn-no-select'} ml-10`}
                onClick={() => setIsPlayerInfo(false)}
              >
                ラリーマスター情報
              </CustomButton>
            </div>
            {isPlayerInfo ? <PlayerInformation /> : <MasterInformation />}
          </div>
        </div>
      </Spin>
    </>
  );
};

export default UserDetail;

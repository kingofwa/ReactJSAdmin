import React, { useState } from 'react';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import CustomButton from '@components/buttons/custom-button';
import Hashtag from './Hashtag';
import Users from './Users';
import './styles.scss';

const FeaturedManagement = ({ location }) => {
  const [isHashtag, setIsHashtag] = useState(true);

  const onMatchedRoutes = () => {
    return [
      {
        route: {
          path: null,
          breadcrumbName: '注目コンテンツ管理'
        }
      }
    ];
  };

  return (
    <>
      <HeaderTitle title="注目コンテンツ管理" />
      <div className="main-container">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div>
          <div className="featured-management-actions">
            <CustomButton
              onClick={() => setIsHashtag(true)}
              className={`${!isHashtag && 'btn-no-select'}`}
            >
              注目のハッシュタグ
            </CustomButton>
            <CustomButton
              className={`${isHashtag && 'btn-no-select'} ml-10`}
              onClick={() => setIsHashtag(false)}
            >
              注目のユーザー
            </CustomButton>
          </div>
          {isHashtag ? <Hashtag /> : <Users />}
        </div>
      </div>
    </>
  );
};

export default FeaturedManagement;

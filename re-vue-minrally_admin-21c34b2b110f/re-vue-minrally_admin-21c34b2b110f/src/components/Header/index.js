import React from 'react';
import { Col, message, Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { signOut } from '@api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@store/user';
import { PATHS } from '@config/paths';
import { MenuOutlined } from '@ant-design/icons';
import { USER_ROLE } from '@config/constants';
import './styles.scss';
import { map } from 'lodash';

const Header = () => {
  const { credentials } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const isBusiness = credentials?.role === USER_ROLE.BUSINESS;
  const history = useHistory();

  const logoutAction = async () => {
    try {
      await signOut();
      history.push(isBusiness ? PATHS.business.login : PATHS.login);
      dispatch(logout());
    } catch (error) {
      message.error(error);
    }
  };

  const navMenus = [
    {
      title: 'ダッシュボード',
      path: PATHS.dashboard
    },
    {
      title: '事業者管理',
      path: PATHS.businessManagement
    },
    {
      title: 'ユーザー管理',
      path: PATHS.userManagement
    },
    {
      title: 'バナー管理',
      path: PATHS.bannerAdministration
    },
    {
      title: 'お知らせ管理',
      path: PATHS.notificationManagement
    },
    {
      title: 'おすすめ管理',
      path: PATHS.recommendationManagement
    },
    {
      title: '注目コンテンツ管理',
      path: PATHS.featuredManagement
    }
  ];

  const businessNavMenus = [
    {
      title: 'ダッシュボード',
      path: PATHS.business.dashboard
    },
    {
      title: '事業者情報',
      path: PATHS.business.info
    },
    {
      title: 'グランドラリー管理',
      path: PATHS.business.grandRallyManagement
    },
    {
      title: 'ラリー管理',
      path: PATHS.business.rallyManagement
    },
    {
      title: '参加者管理',
      path: PATHS.business.playerManagement
    },
    {
      title: '報酬管理',
      path: PATHS.business.rewardManagement
    }
  ];

  const renderMenu = () => {
    if (isBusiness) {
      return map(businessNavMenus, (item, index) => {
        return (
          <Menu.Item key={index}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        );
      });
    }
    return (
      <>
        {navMenus.map((item, index) => (
          <Menu.Item key={index}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
      </>
    );
  };

  return (
    <header className="header">
      <Col span={17}>
        <Menu mode="horizontal" overflowedIndicator={<MenuOutlined />}>
          <Menu.Item key="logo">
            <Link
              to={isBusiness ? PATHS.business.dashboard : PATHS.dashboard}
              className="header-logo"
            >
              {isBusiness ? 'みんラリ事業者管理画面' : 'みんラリ運営管理画面'}
            </Link>
          </Menu.Item>
          {renderMenu()}
        </Menu>
      </Col>
      <Col>
        <Menu mode="horizontal">
          <Menu.Item key="credentials">{credentials?.uid}</Menu.Item>
          <Menu.Item key="action" onClick={logoutAction}>
            <span className="header-btn">ログアウト</span>
          </Menu.Item>
        </Menu>
      </Col>
    </header>
  );
};

export default Header;

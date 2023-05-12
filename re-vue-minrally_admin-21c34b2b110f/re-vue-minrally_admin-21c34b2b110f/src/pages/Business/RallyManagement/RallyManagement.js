import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import AdminBreadcrumb from '@components/AdminBreadcrumb';
import HeaderTitle from '@components/HeaderTitle';
import { deleteEvent } from '@api/event';
import BusinessRallyTable from '@components/Business/BusinessRallyTable';
import { getRally } from '@api/business';
import './styles.scss';

const NUM_PER_PAGE = 20;

const onMatchedRoutes = () => {
  return [
    {
      route: {
        path: null,
        breadcrumbName: 'ラリー管理'
      }
    }
  ];
};

const RallyManagement = ({ location }) => {
  const [games, setGames] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [gamesPagination, setGamesPagination] = useState({
    current: 1,
    page: 1,
    pageSize: NUM_PER_PAGE
  });

  const onChangeGamesPage = newPage => {
    fetchGames(newPage);
  };

  const onDelGame = async id => {
    try {
      setIsLoading(true);
      await deleteEvent(id);
      fetchGames(gamesPagination?.current);
    } catch (error) {
      message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGames = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await getRally({
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HeaderTitle title="ラリー管理" />
      <div className="main-container business-detail">
        <AdminBreadcrumb
          locationPath={location.pathname}
          onMatchedRoutes={onMatchedRoutes}
        />
        <div className="business-detail-content">
          <BusinessRallyTable
            data={games}
            onPageChange={onChangeGamesPage}
            pagination={gamesPagination}
            loading={isLoading}
            onDelGame={onDelGame}
            isBusiness
            pageSize={NUM_PER_PAGE}
          />
        </div>
      </div>
    </>
  );
};

export default RallyManagement;

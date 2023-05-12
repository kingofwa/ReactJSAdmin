import React from 'react';
import { matchRoutes } from 'react-router-config';
import { ROUTES } from '@config/routes/routes';
import { Breadcrumb, Col, Row, Typography } from 'antd';
import './index.scss';

const { Link } = Typography;

const AdminBreadcrumb = ({ locationPath, onMatchedRoutes }) => {
  let matchedRoutes = matchRoutes(ROUTES, locationPath);

  if (typeof onMatchedRoutes === 'function') {
    matchedRoutes = onMatchedRoutes(matchedRoutes);
  }

  return (
    <Row>
      <Col md={24}>
        <Breadcrumb className="admin-breadcrumb" separator={'>'}>
          {matchedRoutes.map((matchRoute, i) => {
            const { path, breadcrumbName } = matchRoute.route;
            const isActive = path === locationPath;

            return isActive ? (
              <Breadcrumb.Item key={`breadcrumb-${i}`}>
                {breadcrumbName}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={`breadcrumb-${i}`}>
                <Link href={path}>{breadcrumbName}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </Col>
    </Row>
  );
};

export default AdminBreadcrumb;

import React, { useState } from 'react';
import { Layout, Switch, Breadcrumb } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';

import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import { useAppContext } from '../context/AppContext';

const { Header, Content } = Layout;

/**
 * DashboardLayout is the main layout component for the application.
 *
 * It includes:
 * - A collapsible sidebar for navigation.
 * - A header containing a theme toggle switch (currently hidden).
 * - Breadcrumb navigation that reflects the current route.
 * - An Outlet to render nested route components.
 *
 * The layout uses Ant Design's Layout components and consumes theme state
 * from the global app context to allow switching between light and dark modes.
 */
const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const { theme, setTheme } = useAppContext();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout style={{ background: '#fdfdfd' }}>
        <Header
          style={{
            background: '#fff',
            display: 'none',
            justifyContent: 'flex-end',
          }}
        >
          <Switch
            checked={theme === 'dark'}
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<BulbOutlined />}
            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </Header>

        <Content
          style={{
            margin: 0,
            padding: 12,
            background: '#fff',
          }}
        >
          <Breadcrumb style={{ marginBottom: 12 }}>
            <Breadcrumbs pathname={location.pathname} />
          </Breadcrumb>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

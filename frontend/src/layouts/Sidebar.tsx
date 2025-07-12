import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  PlusCircleOutlined,
  TableOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

import CrawlStatus from './CrawlStatus';

const { Sider } = Layout;

interface ISidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

/**
 * Sidebar component renders a collapsible sidebar with navigation menu and crawl status.
 *
 * Props:
 * - collapsed: boolean to indicate if the sidebar is collapsed.
 * - setCollapsed: function to toggle the collapsed state.
 *
 * Features:
 * - Displays a header with an icon and title (hidden when collapsed).
 * - Collapsible menu with navigation links (URL Home, Results).
 * - Includes the CrawlStatus component to show current crawl stats.
 * - Uses React Router's useLocation and useNavigate for active link highlighting and navigation.
 */
const Sidebar: React.FC<ISidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={200}
      style={{ background: '#f9f9f9', borderRight: '1px solid #d0d7de' }}
    >
      <div
        style={{
          color: 'black',
          padding: '12px',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {!collapsed && <span>URL Analyzer</span>}
          <GlobalOutlined />
        </span>
        <Button
          type="text"
          size="small"
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '16px', padding: 0 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={[
          { key: '/', icon: <PlusCircleOutlined />, label: 'URL Home' },
          { key: '/results', icon: <TableOutlined />, label: 'Results' },
        ]}
      />

      <CrawlStatus collapsed={collapsed} />
    </Sider>
  );
};

export default Sidebar;

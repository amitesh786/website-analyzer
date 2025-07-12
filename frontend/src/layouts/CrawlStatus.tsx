import React, { useEffect } from 'react';
import { Typography, Badge, Space } from 'antd';
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useCrawlStats } from '../hooks/useCrawlStats';

const { Title, Text } = Typography;

/**
 * useCrawlStats displays the current status counts of web crawls.
 *
 * Props:
 *  - collapsed: boolean flag that controls whether to show a compact icon-only view
 *    (true) or a detailed view with labels and counts (false).
 *
 * It consumes crawl statistics from the global app context and uses Ant Design
 * badges and icons to visually represent each status category: queued, running,
 * done, and error.
 */
const CrawlStatus: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const { stats, refresh } = useCrawlStats();

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: '16px', borderTop: '1px solid #d0d7de', marginTop: 24 }}>
      <Title level={5} style={{ color: '#000', marginBottom: 12 }}>
        {collapsed ? <ClockCircleOutlined style={{ fontSize: 20 }} /> : 'Crawl Status'}
      </Title>
      <Space direction="vertical" size="small">
        <Text>
          <Badge color="#1890ff" />
          {collapsed ? (
            <ClockCircleOutlined style={{ marginLeft: 6 }} />
          ) : (
            ` Queued: ${stats.queued}`
          )}
        </Text>
        <Text>
          <Badge color="#fa8c16" />
          {collapsed ? (
            <SyncOutlined spin style={{ marginLeft: 6 }} />
          ) : (
            ` Running: ${stats.running}`
          )}
        </Text>
        <Text>
          <Badge color="#52c41a" />
          {collapsed ? <CheckCircleOutlined style={{ marginLeft: 6 }} /> : ` Done: ${stats.done}`}
        </Text>
        <Text>
          <Badge color="#f5222d" />
          {collapsed ? <CloseCircleOutlined style={{ marginLeft: 6 }} /> : ` Error: ${stats.error}`}
        </Text>
      </Space>
    </div>
  );
};

export default CrawlStatus;

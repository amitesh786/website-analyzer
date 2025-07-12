import { Tag } from 'antd';

export const getStatusTag = (status: string) => {
  const colorMap: Record<string, string> = {
    queued: 'blue',
    running: 'orange',
    done: 'green',
    error: 'red',
  };
  return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
};

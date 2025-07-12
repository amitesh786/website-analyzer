import React from 'react';
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { IURLData } from './types';
import { deleteUrls, stopProcessingURL } from '../../services/apiService';
import { getStatusTag } from './utils';

export const getColumns = (
  navigate: (path: string) => void,
  reload: () => void
): ColumnsType<IURLData> => [
  {
    title: 'URL',
    dataIndex: 'url',
    render: (url: string) => url,
    width: 100,
  },
  {
    title: 'Title',
    dataIndex: 'page_title',
    sorter: (a, b) => (a.page_title || '').localeCompare(b.page_title || ''),
  },
  {
    title: 'HTML Version',
    dataIndex: 'html_version',
    sorter: (a, b) => (a.html_version || '').localeCompare(b.html_version || ''),
  },
  {
    title: 'Internal Links',
    dataIndex: 'internal_links',
    sorter: (a, b) => a.internal_links - b.internal_links,
  },
  {
    title: 'External Links',
    dataIndex: 'external_links',
    sorter: (a, b) => a.external_links - b.external_links,
  },
  {
    title: 'Has Login',
    dataIndex: 'has_login_form',
    render: (val: boolean) => (val ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: getStatusTag,
    filters: ['queued', 'running', 'done', 'error'].map((val) => ({
      text: val.charAt(0).toUpperCase() + val.slice(1),
      value: val,
    })),
    onFilter: (value, record) => record.status === value,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_text, record) => (
      <Space>
        <Tooltip title={record.status === 'done' ? 'Details' : 'Details unavailable'}>
          <Button
            type="link"
            icon={<InfoCircleOutlined />}
            onClick={() => {
              if (record.status === 'done') {
                navigate(`/detail/${encodeURIComponent(record.url)}`);
              }
            }}
            disabled={record.status !== 'done'}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Popconfirm
            title="Are you sure to delete this URL?"
            onConfirm={async () => {
              if (record.status === 'running' || record.status === 'queued') {
                await stopProcessingURL(record.url);
              }
              await deleteUrls([record.url]);
              reload();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Tooltip>
      </Space>
    ),
  },
];

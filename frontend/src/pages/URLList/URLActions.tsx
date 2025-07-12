import React from 'react';
import { Input, Button, Space } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import { IURLActionsProps } from './types';

const { Search } = Input;

const URLActions: React.FC<IURLActionsProps> = ({ onSearch, onDelete, onReRun, hasSelection }) => (
  <Space style={{ marginBottom: 16 }}>
    <Search placeholder="Search URL..." onSearch={onSearch} enterButton allowClear />
    <Button disabled={!hasSelection} onClick={onDelete} icon={<DeleteOutlined />}>
      Delete Selected
    </Button>
    <Button disabled={!hasSelection} onClick={onReRun} icon={<SyncOutlined />}>
      Re-run Analysis
    </Button>
  </Space>
);

export default URLActions;

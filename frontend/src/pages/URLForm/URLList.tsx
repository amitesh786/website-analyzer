import React from 'react';
import { Button, List, Space } from 'antd';
import { IURLListProps } from './types';

const URLList: React.FC<IURLListProps> = ({ items, processingMap, onStart, onStop }) => {
  return (
    <List
      header={<strong>Submitted URLs</strong>}
      bordered
      dataSource={items}
      style={{ marginTop: 24 }}
      renderItem={({ url, status }) => (
        <List.Item
          actions={[
            status === 'idle' ? (
              <Button type="primary" loading={processingMap[url]} onClick={() => onStart(url)}>
                Start
              </Button>
            ) : status === 'processing' ? (
              <Button danger loading={false} onClick={() => onStop(url)}>
                Stop
              </Button>
            ) : (
              <Button disabled>Done</Button>
            ),
          ]}
        >
          <Space>
            <span>{url}</span>
            <span
              style={{
                color: status === 'processing' ? 'green' : status === 'done' ? 'blue' : 'gray',
              }}
            >
              ({status})
            </span>
          </Space>
        </List.Item>
      )}
    />
  );
};

export default URLList;

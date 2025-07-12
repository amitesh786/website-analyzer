import React from 'react';
import { Form, Input, Button } from 'antd';
import { IURLInputProps } from './types';

const URLInput: React.FC<IURLInputProps> = ({ url, submitting, setUrl, onSubmit }) => {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label="Enter URL"
        name="url"
        rules={[
          { required: true, message: 'Please enter a URL' },
          { type: 'url', message: 'Please enter a valid URL' },
        ]}
      >
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://google.com"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          Process URL
        </Button>
      </Form.Item>
    </Form>
  );
};

export default URLInput;

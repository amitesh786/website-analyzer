import React from 'react';
import { Card } from 'antd';
import { IAppCardProps } from './types';

const AppCard: React.FC<IAppCardProps> = ({ title, children, extra, size = 'default', style }) => (
  <Card title={title} extra={extra} size={size} style={{ borderRadius: 6, ...style }}>
    {children}
  </Card>
);

export default AppCard;

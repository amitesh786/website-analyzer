import { ColumnsType } from 'antd/es/table';
import React, { ReactNode } from 'react';
import Highcharts from 'highcharts';
import { CardProps, TableProps } from 'antd';

export interface IAppCardProps {
  title: ReactNode;
  children: ReactNode;
  extra?: ReactNode;
  size?: CardProps['size'];
  style?: React.CSSProperties;
}

export interface IAppChartProps {
  options: Highcharts.Options;
}

export interface IAppTableProps<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  rowKey: string;
  pageSize?: number;
  pagination?: TableProps<T>['pagination'];
  rowSelection?: TableProps<T>['rowSelection'];
  scroll?: TableProps<T>['scroll'];
}

import React from 'react';
import { Table } from 'antd';
import { IAppTableProps } from './types';

function AppTable<T>({
  columns,
  dataSource,
  rowKey,
  pagination,
  pageSize,
  rowSelection,
  scroll,
}: IAppTableProps<T>) {
  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      rowSelection={rowSelection}
      scroll={scroll}
      pagination={{
        defaultPageSize: pageSize ?? 10,
        pageSizeOptions: ['5', '10', '20', '50', '100'],
        showSizeChanger: true,
        showTotal: (total, range) => `Showing rows ${range[0]} to ${range[1]} of ${total}`,
        ...pagination,
      }}
    />
  );
}

export default AppTable;

import React from 'react';
import { getColumns } from './columns';
import { IURLData, IURLTableProps } from './types';
import AppTable from '../../components/AppTable';

const URLTable: React.FC<IURLTableProps> = ({
  data,
  selectedRowKeys,
  setSelectedRowKeys,
  navigate,
  reload,
}) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <AppTable<IURLData>
        columns={getColumns(navigate, reload)}
        dataSource={data}
        rowKey="url"
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        scroll={{ x: 'max-content' }}
        pageSize={10}
      />
    </div>
  );
};

export default URLTable;

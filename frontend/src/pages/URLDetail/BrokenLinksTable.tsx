import React from 'react';
import { IBrokenLinksTableProps } from './types';
import { v4 as uuidv4 } from 'uuid';
import AppCard from '../../components/AppCard';
import AppTable from '../../components/AppTable';

const BrokenLinksTable: React.FC<IBrokenLinksTableProps> = ({ brokenLinks }) => {
  const columns = [
    { title: 'Broken Link', dataIndex: 'url', key: 'url', width: '80%' },
    { title: 'Status Code', dataIndex: 'status', key: 'status', width: '20%' },
  ];
  const processedLinks = brokenLinks.map((link) => ({
    ...link,
    uuid: uuidv4(),
  }));

  return (
    <AppCard title="Broken / Inaccessible Links" size="small" style={{ borderRadius: 6 }}>
      {brokenLinks.length > 0 ? (
        <AppTable columns={columns} dataSource={processedLinks} rowKey="uuid" pageSize={5} />
      ) : (
        <p>No broken links detected.</p>
      )}
    </AppCard>
  );
};

export default BrokenLinksTable;

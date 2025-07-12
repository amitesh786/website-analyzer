import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  fetchUrls,
  deleteUrls,
  startProcessingURL,
  stopProcessingURL,
} from '../../services/apiService';
import URLTable from './URLTable';
import URLActions from './URLActions';
import { IURLData } from './types';
import Fuse from 'fuse.js';
import AppCard from '../../components/AppCard';
import { useCrawlStats } from '../../hooks/useCrawlStats';
import axios from 'axios';

const URLList: React.FC = () => {
  const navigate = useNavigate();
  const [urls, setUrls] = useState<IURLData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');
  const { refresh } = useCrawlStats();

  useEffect(() => {
    loadUrls();

    // eslint-disable-next-line no-undef
    const interval = setInterval(() => {
      loadUrls();
    }, 5000);

    // eslint-disable-next-line no-undef
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUrls = async () => {
    try {
      const data = await fetchUrls();
      setUrls(data);
      refresh();
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Error fetching URLs:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const handleDelete = async () => {
    try {
      for (const key of selectedRowKeys) {
        const urlData = urls.find((item) => item.url === key);
        if (!urlData) continue;

        if (urlData.status === 'running' || urlData.status === 'queued') {
          // You need to implement stopProcessingURL if not already present
          await stopProcessingURL(urlData.url);
        }
      }
      await deleteUrls(selectedRowKeys);
      await loadUrls();
      setSelectedRowKeys([]);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.error || 'URL Stop Failed');
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('URL Stop Failed');
      }
    }
  };

  const handleReRun = async () => {
    try {
      for (const key of selectedRowKeys) {
        await startProcessingURL(key as string); // run one by one, waiting for each to finish
      }
      await loadUrls(); // refresh URLs and update global stats
      setSelectedRowKeys([]);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.error || 'Re-run failed');
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('Re-run failed');
      }
    }
  };

  const fuse = new Fuse(urls, {
    keys: ['url', 'page_title', 'html_version', 'external_links', 'internal_links'],
    threshold: 0.3,
  });

  const filteredUrls = searchText ? fuse.search(searchText).map((result) => result.item) : urls;

  return (
    <AppCard title="Dashboard Results" size="small" style={{ borderRadius: 8, minWidth: 300 }}>
      <URLActions
        onSearch={handleSearch}
        onDelete={handleDelete}
        onReRun={handleReRun}
        hasSelection={!!selectedRowKeys.length}
      />
      <URLTable
        data={filteredUrls}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        navigate={navigate}
        reload={loadUrls}
      />
    </AppCard>
  );
};

export default URLList;

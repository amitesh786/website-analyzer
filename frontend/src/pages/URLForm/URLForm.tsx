import React, { useState } from 'react';
import { message } from 'antd';
import URLInput from './URLInput';
import URLList from './URLList';
import { startProcessingURL, stopProcessingURL } from '../../services/apiService';
import { URLItem } from './types';
import AppCard from '../../components/AppCard';
import axios from 'axios';

const URLForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [urlList, setUrlList] = useState<URLItem[]>([]);
  const [processingMap, setProcessingMap] = useState<Record<string, boolean>>({});
  const [, setActiveProcessing] = useState<Set<string>>(new Set());

  const handleSubmit = async () => {
    if (!url) return;
    setSubmitting(true);
    setUrlList((prev) => [...prev, { url, status: 'idle' }]);
    setUrl('');
    message.success('URL submitted in backlog');
    setSubmitting(false);
  };

  const setButtonLoading = (targetUrl: string, loading: boolean) => {
    setProcessingMap((prev) => ({ ...prev, [targetUrl]: loading }));
  };

  const startProcessing = async (targetUrl: string) => {
    setButtonLoading(targetUrl, true);
    setActiveProcessing((prev) => new Set(prev).add(targetUrl));

    try {
      setUrlList((prev) =>
        prev.map((item) => (item.url === targetUrl ? { ...item, status: 'processing' } : item))
      );
      await startProcessingURL(targetUrl);

      // Add 2s delay to allow UI to show "processing"
      // eslint-disable-next-line no-undef
      await new Promise((res) => setTimeout(res, 2000));

      setActiveProcessing((prev) => {
        if (prev.has(targetUrl)) {
          setUrlList((list) =>
            list.map((item) => (item.url === targetUrl ? { ...item, status: 'done' } : item))
          );
          message.success(`Processing completed for ${targetUrl}`);
        }
        const next = new Set(prev);
        next.delete(targetUrl);
        return next;
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.error || 'URL Start Failed');
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('URL Start Failed');
      }
      setUrlList((prev) =>
        prev.map((item) => (item.url === targetUrl ? { ...item, status: 'idle' } : item))
      );
      setActiveProcessing((prev) => {
        const next = new Set(prev);
        next.delete(targetUrl);
        return next;
      });
    } finally {
      setButtonLoading(targetUrl, false);
    }
  };

  const stopProcessing = async (targetUrl: string) => {
    setButtonLoading(targetUrl, true);
    try {
      await stopProcessingURL(targetUrl);
      setUrlList((prev) =>
        prev.map((item) => (item.url === targetUrl ? { ...item, status: 'idle' } : item))
      );
      message.info(`Stopped processing ${targetUrl}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.error || 'URL Stop Failed');
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('URL Stop Failed');
      }
    } finally {
      setActiveProcessing((prev) => {
        const next = new Set(prev);
        next.delete(targetUrl);
        return next;
      });
      setButtonLoading(targetUrl, false);
    }
  };

  return (
    <AppCard title="URL Management" size="small" style={{ borderRadius: 8, minWidth: 300 }}>
      <URLInput url={url} setUrl={setUrl} submitting={submitting} onSubmit={handleSubmit} />
      <URLList
        items={urlList}
        processingMap={processingMap}
        onStart={startProcessing}
        onStop={stopProcessing}
      />
    </AppCard>
  );
};

export default URLForm;

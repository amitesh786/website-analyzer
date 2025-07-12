/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { fetchCrawlStats } from '../services/apiService';
import { ICrawlStats } from './types';

export const useCrawlStats = () => {
  const [stats, setStats] = useState<ICrawlStats>({
    queued: 0,
    running: 0,
    done: 0,
    error: 0,
  });

  const refresh = async () => {
    try {
      const data = await fetchCrawlStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch crawl stats:', err);
    }
  };

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 5000); // every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return { stats, refresh };
};

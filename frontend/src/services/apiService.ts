/* eslint-disable no-undef */
import axios from 'axios';

/**
 * API service module to interact with backend endpoints for URL processing and crawl stats.
 *
 * Uses axios with a configured instance including base URL and Authorization header.
 * Environment variables REACT_APP_API_URL and REACT_AUTH_TOKEN are used for configuration.
 *
 * Functions:
 * - startProcessingURL(url): Initiates processing for a given URL.
 * - stopProcessingURL(url): Stops processing for a given URL.
 * - fetchUrls(): Retrieves a list of processed URLs/results.
 * - deleteUrls(urls): Deletes multiple URLs from the backend.
 * - fetchURLDetails(url): Fetches detailed information for a specific URL.
 * - fetchCrawlStats(): Retrieves current crawl statistics.
 */
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const REACT_AUTH_TOKEN = process.env.REACT_AUTH_TOKEN || 'secure-token';

const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${REACT_AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const startProcessingURL = async (url: string) => {
  const response = await axiosInstance.post('/start', { url });
  return response.data;
};

export const stopProcessingURL = async (url: string) => {
  const response = await axiosInstance.post('/stop', { url });
  return response.data;
};

export const fetchUrls = async () => {
  const response = await axiosInstance.get('/results');
  return response.data;
};

export const deleteUrls = async (urls: React.Key[]) => {
  const data = { urls };
  const response = await axiosInstance.delete('/delete', { data });
  return response.data;
};

export const fetchURLDetails = async (url: string) => {
  const response = await axiosInstance.get(`/detail/${url}`);
  return response.data;
};

export const fetchCrawlStats = async () => {
  const response = await axiosInstance.get('/crawl-stats');
  return response.data;
};

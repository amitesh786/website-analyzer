import { renderHook, act } from '@testing-library/react-hooks';
import { useCrawlStats } from './useCrawlStats';
import * as apiService from '../services/apiService';

jest.useFakeTimers();

describe('useCrawlStats hook', () => {
  const mockStats = { queued: 1, running: 2, done: 3, error: 4 };

  beforeEach(() => {
    jest.spyOn(apiService, 'fetchCrawlStats').mockResolvedValue(mockStats);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should fetch crawl stats on mount AND on refresh call', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCrawlStats());

    await waitForNextUpdate();

    expect(apiService.fetchCrawlStats).toHaveBeenCalledTimes(1);
    expect(result.current.stats).toEqual(mockStats);

    await act(async () => {
      await result.current.refresh();
    });

    expect(apiService.fetchCrawlStats).toHaveBeenCalledTimes(2);
    expect(result.current.stats).toEqual(mockStats);
  });

  test('Should call refresh every 5 seconds', async () => {
    renderHook(() => useCrawlStats());

    expect(apiService.fetchCrawlStats).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(apiService.fetchCrawlStats).toHaveBeenCalledTimes(2);
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(apiService.fetchCrawlStats).toHaveBeenCalledTimes(3);
  });
});

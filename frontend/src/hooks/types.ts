// Represents the statistics of the crawling process with counts for each status
export interface ICrawlStats {
  queued: number;
  running: number;
  done: number;
  error: number;
}

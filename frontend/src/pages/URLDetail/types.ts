export interface IBrokenLinksTableProps {
  brokenLinks: { url: string; status: number }[];
}

export interface ILinksChartCardProps {
  chartType: 'pie' | 'bar';
  setChartType: (type: 'pie' | 'bar') => void;
  internalLinks: number;
  externalLinks: number;
}

import React from 'react';
import { Button } from 'antd';
import Highcharts from 'highcharts';
import { ILinksChartCardProps } from './types';
import AppChart from '../../components/AppChart';
import AppCard from '../../components/AppCard';

const LinksChartCard: React.FC<ILinksChartCardProps> = ({
  chartType,
  setChartType,
  internalLinks,
  externalLinks,
}) => {
  let series: Highcharts.SeriesOptionsType[];
  if (chartType === 'pie') {
    series = [
      {
        type: 'pie',
        data: [
          { name: 'Internal Links', y: internalLinks },
          { name: 'External Links', y: externalLinks },
        ],
      },
    ];
  } else {
    series = [
      {
        type: 'bar',
        name: 'Internal Links',
        data: [internalLinks],
        color: '#7cb5ec',
      },
      {
        type: 'bar',
        name: 'External Links',
        data: [externalLinks],
        color: '#434348',
      },
    ];
  }

  const chartOptions: Highcharts.Options = {
    chart: { type: chartType },
    title: { text: '' },
    xAxis: { visible: chartType === 'bar', labels: { enabled: false } },
    yAxis: {
      visible: chartType === 'bar',
      labels: { enabled: false },
      title: { text: '' },
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y}' },
      },
      bar: {
        dataLabels: {
          enabled: true,
          inside: true,
          style: { color: '#fff', textOutline: 'none' },
        },
      },
    },
    credits: { enabled: false },
    series,
  };

  return (
    <AppCard
      title="Internal vs External Links"
      size="small"
      extra={
        <Button.Group size="small">
          <Button
            type={chartType === 'pie' ? 'primary' : 'default'}
            onClick={() => setChartType('pie')}
          >
            Pie
          </Button>
          <Button
            type={chartType === 'bar' ? 'primary' : 'default'}
            onClick={() => setChartType('bar')}
          >
            Bar
          </Button>
        </Button.Group>
      }
    >
      <AppChart options={chartOptions} />
    </AppCard>
  );
};

export default LinksChartCard;

import React, { useEffect, useState } from 'react';
import { Col, Row, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { fetchURLDetails } from '../../services/apiService';
import { IURLDetailsData } from '../types';
import PageInfoCard from './PageInfoCard';
import LinksChartCard from './LinksChartCard';
import BrokenLinksTable from './BrokenLinksTable';
import AppCard from '../../components/AppCard';

const URLDetail = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const decodedUrl = decodeURIComponent(id!);
  const [details, setDetails] = useState<IURLDetailsData | null>(null);
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchURLDetails(decodedUrl);
        setDetails(data);
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Error loading details', error);
      }
    };
    loadDetails();
  }, [decodedUrl]);

  if (!details) return <Skeleton active />;

  return (
    <AppCard title={`Details for URL: ${details.url}`} size="small" style={{ borderRadius: 8 }}>
      <Row gutter={24}>
        <Col span={8}>
          <PageInfoCard details={details} />
        </Col>
        <Col span={16}>
          <LinksChartCard
            chartType={chartType}
            setChartType={setChartType}
            internalLinks={details.internal_links}
            externalLinks={details.external_links}
          />
        </Col>
      </Row>
      <div style={{ marginTop: 24 }}>
        <BrokenLinksTable brokenLinks={details.inaccessible_links || []} />
      </div>
    </AppCard>
  );
};

export default URLDetail;

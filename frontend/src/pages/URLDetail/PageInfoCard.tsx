import React from 'react';
import { Typography, Tag } from 'antd';
import { IURLDetailsData } from '../types';
import AppCard from '../../components/AppCard';

const { Paragraph } = Typography;

const PageInfoCard: React.FC<{ details: IURLDetailsData }> = ({ details }) => (
  <AppCard title="Page Info" size="small">
    <Paragraph>
      <strong>HTML Version:</strong> {details.html_version}
    </Paragraph>
    <Paragraph>
      <strong>Page Title:</strong> {details.page_title}
    </Paragraph>
    <Paragraph>
      <strong>Contains Login Form:</strong>{' '}
      {details.has_login_form ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>}
    </Paragraph>
    <Paragraph>
      <strong>Headings Count:</strong>
      <pre>{JSON.stringify(details.headings_count, null, 2)}</pre>
    </Paragraph>
  </AppCard>
);

export default PageInfoCard;

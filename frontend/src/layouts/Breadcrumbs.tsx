import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

/**
 * Breadcrumbs component renders a navigation breadcrumb trail
 * based on the current pathname.
 *
 * - If the pathname starts with "/detail/", it shows a fixed breadcrumb:
 *   Home > Results > Details
 *
 * - Otherwise, it dynamically generates breadcrumb items for each
 *   segment in the pathname, linking to the corresponding paths.
 *
 * Props:
 *  - pathname: the current path string from React Router (e.g. "/results" or "/detail/123")
 */
const Breadcrumbs: React.FC<{ pathname: string }> = ({ pathname }) => {
  const pathSnippets = pathname.split('/').filter((i) => i);

  if (pathname.startsWith('/detail/')) {
    return (
      <>
        <Breadcrumb.Item key="/">
          <Link to="/">URL Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key="/results">
          <Link to="/results">Results</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key="/detail">Details</Breadcrumb.Item>
      </>
    );
  }

  return (
    <>
      <Breadcrumb.Item key="/">
        <Link to="/">URL Home</Link>
      </Breadcrumb.Item>
      {pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const label =
          snippet === 'results' ? 'Results' : snippet === 'details' ? 'Details View' : snippet;

        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{label}</Link>
          </Breadcrumb.Item>
        );
      })}
    </>
  );
};

export default Breadcrumbs;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import URLForm from './pages/URLForm/URLForm';
import URLList from './pages/URLList/URLList';
import URLDetail from './pages/URLDetail/URLDetail';
import { useAppContext } from './context/AppContext';
import { Navigate } from 'react-router-dom';

import 'antd/dist/reset.css';
import './App.css';

import { ConfigProvider, theme as antdTheme } from 'antd';

const App: React.FC = () => {
  const { theme } = useAppContext();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<URLForm />} />
            <Route path="results" element={<URLList />} />
            <Route path="detail/:id" element={<URLDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;

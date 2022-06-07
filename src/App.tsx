import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import ErrorBoundary from './components/error/ErrorBoundary';
import MainLayout from './components/main/MainLayout';
import Core from './containers/base/Core';
import EditUserProfilePage from './pages/account/EditUserProfilePage';
import MainAccountPage from './pages/account/MainAccountPage';
import MainDeliverablePage from './pages/deliverable/MainDeliverablePage';
import LoginPage from './pages/LoginPage';
import MainPriorityPage from './pages/priority/MainPriorityPage';
import RegisterPage from './pages/RegisterPage';
import StatisticsPage from './pages/statistics/StatisticsPage';
import MainTaskPage from './pages/task/MainTaskPage';

function App() {
  return (
    <>
      <Helmet>
        <title>IDL Management Toolkit</title>
        <meta name='description' content='IDL Management Toolkit.' />
      </Helmet>
      <ErrorBoundary>
        <Routes>
          <Route path='register' element={<RegisterPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route index element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route
              path='tasks'
              element={
                <AuthenticatedRoute>
                  <MainTaskPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path='priorities'
              element={
                <AuthenticatedRoute>
                  <MainPriorityPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path='deliverables'
              element={
                <AuthenticatedRoute>
                  <MainDeliverablePage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path='statistics'
              element={
                <AuthenticatedRoute>
                  <StatisticsPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path='account'
              element={
                <AuthenticatedRoute>
                  <MainAccountPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path='account/edit-profile'
              element={
                <AuthenticatedRoute>
                  <EditUserProfilePage />
                </AuthenticatedRoute>
              }
            />
          </Route>
        </Routes>
      </ErrorBoundary>
      <Core />
    </>
  );
}

export default App;

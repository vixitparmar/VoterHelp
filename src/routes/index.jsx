import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import ProcessPage from '../pages/ProcessPage';
import TimelinePage from '../pages/TimelinePage';
import VotingGuide from '../pages/VotingGuide';
import FAQPage from '../pages/FAQPage';
import AdminPage from '../pages/AdminPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'process', element: <ProcessPage /> },
      { path: 'timeline', element: <TimelinePage /> },
      { path: 'how-to-vote', element: <VotingGuide /> },
      { path: 'faqs', element: <FAQPage /> },
      { path: 'admin', element: <AdminPage /> },
    ]
  }
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;

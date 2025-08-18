import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const SuperAdminLogin = React.lazy(() => import('./pages/SuperAdminLogin'));
const AdminMain = React.lazy(() => import('./pages/admin/AdminMain'));
const QuickPurchase = React.lazy(() => import('./pages/QuickPurchase'));
const TrackOrder = React.lazy(() => import('./pages/TrackOrder'));
const Cart = React.lazy(() => import('./pages/Cart'));

import DataRoute from './route/DataRoute';

import App from 'antd/es/app';
const HomePage = React.lazy(() => import('./pages/Home'));
const CheckOut = React.lazy(() => import('./pages/CheckOut'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const PaymentInfo = React.lazy(() => import('./pages/PaymentInfo'));


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/admin',
    element: <SuperAdminLogin />
  },
  {
    path: '/dashboard',
    element: <AdminMain />
  },
  {
    path: '/quick-purchase',
    element: <DataRoute><QuickPurchase /></DataRoute>
  },
  {
    path: '/track-order',
    element: <TrackOrder />
  },
  {
    path: '/cart',
    element: <DataRoute><Cart /></DataRoute>
  }, {
    path: '/checkout',
    element: <DataRoute><CheckOut /></DataRoute>
  },
  {
    path: '/payment-info',
    element: <PaymentInfo />
  },
  {
    path: '/contact-us',
    element: <ContactUs />
  }
]);

createRoot(document.getElementById('root')).render(
  <App>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </App>
)

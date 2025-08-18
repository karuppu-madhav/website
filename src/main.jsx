import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SuperAdminLogin from './pages/SuperAdminLogin';
import AdminMain from './pages/admin/AdminMain';
import QuickPurchase from './pages/QuickPurchase';
import TrackOrder from './pages/TrackOrder';
import Cart from './pages/Cart';

import DataRoute from './route/DataRoute';

import { App } from 'antd';
import CheckOut from './pages/CheckOut';
import ContactUs from './pages/ContactUs';
import PaymentInfo from './pages/PaymentInfo';
import HomePage from './pages/Home';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
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
    path:'/track-order',
    element:<TrackOrder/>
  },
  {
    path: '/cart',
    element: <DataRoute><Cart /></DataRoute>
  }, {
    path: '/checkout',
    element: <DataRoute><CheckOut /></DataRoute>
  },
  {
    path:'/payment-info',
    element:<PaymentInfo/>
  },
  {
    path:'/contact-us',
    element:<ContactUs/>
  }
]);

createRoot(document.getElementById('root')).render(
  <App>
    <RouterProvider router={router} />
  </App>
)

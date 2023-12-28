import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import Sidenav from './Pages/Layout/Sidenav-header';

const Dashboard = React.lazy(() => import('./Pages/DashBoard/Dashboard'));
const OrderList = React.lazy(() => import('./Pages/OrderList/OrderList'));
const SalesList = React.lazy(() => import('./Pages/SalesList/SalesList'));
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Sidenav><Dashboard /></Sidenav>} />
          <Route path="/orderlist" element={<Sidenav><OrderList /></Sidenav>} />
          <Route path="/saleslist" element={< SalesList />} />
          <Route>
            <Route index path='/user' element={<Dashboard />} />

            <Route path=':id' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
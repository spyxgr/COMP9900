import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Customer from "./pages/Customer"
import CustomerBill from './pages/CustomerBill';
import Kitchen from "./pages/Kitchen"
import Manager from "./pages/Manager"
import Waiter from './pages/Waiter';
import Staff from './pages/Staff';
import ManagerCategory from './pages/ManagerCategory';
import ManagerKey from './pages/ManagerKey';
import ManagerMenu from './pages/ManagerMenu';
import ManagerOrder from './pages/ManagerOrder';
import ManagerService from './pages/ManagerService';
import KitchenOrder from './pages/KitchenOrder';



function App() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/kitchen/:id" element={<KitchenOrder />} />
        <Route path="/customer/:id/:id" element={<Customer />} />
        <Route path="/customer/:id/bill" element={<CustomerBill />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/manager/category" element={<ManagerCategory />} />
        <Route path="/manager/key" element={<ManagerKey />} />
        <Route path="/manager/menu" element={<ManagerMenu />} />
        <Route path="/manager/order" element={<ManagerOrder />} />
        <Route path="/manager/service" element={<ManagerService />} />
        <Route path="/wait" element={<Waiter />} />
      </Routes>
    </div>
  );
}

export default App;

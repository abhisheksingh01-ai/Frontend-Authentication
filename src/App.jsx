import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Forget from './components/Forget/Forget';
import Reset from './components/Reset/Reset';
import Home from './components/Home/Home';
import Dashboard from './dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/reset-password/:token" element={<Reset />} />
        {/* Add Dashboard Route here */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
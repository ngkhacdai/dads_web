import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import { useState } from "react";
import SideBar from "./components/Sidebars"
import Home from "./pages/Home"
import Account from "./pages/Account"
import Product from "./pages/Product"
import Order from "./pages/Order"
import Category from "./pages/Category";
import Blog from "./pages/Blog";
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={token ? <SideBar><Home /></SideBar> : <Navigate to="/login" />}
        />
        <Route
          path='/accounts'
          element={token ? <SideBar><Account /></SideBar> : <Navigate to="/login" />}
        />
        <Route
          path='/products'
          element={token ? <SideBar><Product /></SideBar> : <Navigate to="/login" />}
        />
        <Route
          path='/orders'
          element={token ? <SideBar><Order /></SideBar> : <Navigate to="/login" />}
        />
        <Route
          path='/categorys'
          element={token ? <SideBar><Category /></SideBar> : <Navigate to="/login" />}
        />
        <Route
          path='/blogs'
          element={token ? <SideBar><Blog /></SideBar> : <Navigate to="/login" />}
        />
        <Route path='/login' element={<Login setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

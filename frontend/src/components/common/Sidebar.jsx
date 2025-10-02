import React, { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuth";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AdminAuthContext);

  return (
    <div className="card shadow mb-5 sidebar">
      <div className="card-body p-4">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/admin/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/admin/categories">Categories</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/admin/brands">Brands</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/admin/products">Products</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/admin/orders">Orders</NavLink>
          </li>
          <li>
            <a href="">Users</a>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/admin/shipping">Shipping</NavLink>
          </li>
          <li>
            <a href="">Change Password</a>
          </li>
          <li>
            <a href="javascript:;" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

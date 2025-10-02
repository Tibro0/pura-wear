import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const UserSidebar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="card shadow mb-5 sidebar">
      <div className="card-body p-4">
        <ul>
          <li>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/account">Account</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/account/orders">Orders</NavLink>
          </li>
          <li>
            <Link to="#">Change Password</Link>
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

export default UserSidebar;

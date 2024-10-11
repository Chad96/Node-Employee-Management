import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserPlus } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Employee Admin</h2>
      <ul>
        <li>
          <Link to="/employees">
            <FaUsers /> Employee List
          </Link>
        </li>
        <li>
          <Link to="/">
            <FaUserPlus /> Add Employee
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

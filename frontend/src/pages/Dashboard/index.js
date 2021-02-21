import React from 'react';
import "./dashboard.scss";
import { test } from '../../api';


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      Dashboard
      <div onClick={() => test()}>TEST</div>
    </div>
  )
}

export default Dashboard;
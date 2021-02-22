import React from 'react';
import "./dashboard.scss";
import {PlusSquareOutlined} from '@ant-design/icons'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="empty-container">
        <PlusSquareOutlined className="empty-add" />
        <p className="empty-text">Add url to monitor</p>
      </div>
    </div>
  )
}

export default Dashboard;
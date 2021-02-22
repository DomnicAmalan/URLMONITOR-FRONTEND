import React, { useState } from 'react';
import "./dashboard.scss";
import {PlusSquareOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { Slider, InputNumber, Row, Col, Input, Modal, Form, Select, Typography } from 'antd';
import "antd/dist/antd.css";
import ModalForm from '../../components/molecules/AddUrlModal'

const { confirm } = Modal;

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [monitors, setMonitors] = useState([]);

  console.log(isModalVisible)

  return (
    <div className="dashboard-container">
      {!monitors.length ?
      <div className="empty-container" onClick={() => setIsModalVisible(true)}>
        <PlusSquareOutlined className="empty-add" />
        <p className="empty-text">Add url to monitor</p>
      </div>: <div>DDF</div>}
      <Modal title="Add URL" visible={isModalVisible} className="modal">
        <ModalForm onFinish={() => setIsModalVisible(!isModalVisible)} />
      </Modal>
    </div>
  )
}

export default Dashboard;
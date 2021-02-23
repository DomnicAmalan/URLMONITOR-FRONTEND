import React, { useEffect, useState } from 'react';
import "./dashboard.scss";
import {PlusSquareOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { Modal, Button } from 'antd';
import "antd/dist/antd.css";
import { ModalForm, ListMonitors } from 'molecules';
import {listMonitors} from '../../API/monitors';

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [monitors, setMonitors] = useState([]);

  const [IsEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    setData()
  }, [])

  const setData = async() => {
    const data = await listMonitors();
    setMonitors(data)
  }

  return (
    <div className="dashboard-container">
      {!monitors.length ?
      <div className="empty-container" onClick={() => setIsModalVisible(true)}>
        <PlusSquareOutlined className="empty-add" />
        <p className="empty-text">Add url to monitor</p>
      </div>: 
      <div className="table-container">
        <div className="table-add-button">
          <Button onClick={() => setIsModalVisible(true)}>
            <PlusSquareOutlined className="add" />
            Add new url
          </Button>
        </div>
        <ListMonitors monitors={monitors} setMonitors={setMonitors} onFinish={() => setIsModalVisible(!isModalVisible)} setEdit={setEdit} setEditData={setEditData} />
      </div>
      }
      <Modal title="Add URL" visible={isModalVisible} className="modal" footer={false} onCancel={() => setIsModalVisible(false)} >
        <ModalForm onFinish={() => setIsModalVisible(!isModalVisible)} monitors={monitors} setMonitors={setMonitors} IsEdit={IsEdit} editData={editData} />
      </Modal>
    </div>
  )
}

export default Dashboard;
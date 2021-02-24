import React, { useContext, useEffect, useState } from 'react';
import "./dashboard.scss";
import {PlusSquareOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { Modal, Button } from 'antd';
import "antd/dist/antd.css";
import { ModalForm, ListMonitors } from 'molecules';
import {listMonitors, deleteMonitor} from '../../API/monitors';
import { toast } from 'react-toastify';
import {LoadingContext} from 'hooks'


const Dashboard = () => {
  const {setProgress} = useContext(LoadingContext)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [monitors, setMonitors] = useState([]);

  const [IsEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [IsDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const MonitorDelete = async(id) => {
    const data = await deleteMonitor(id);
    console.log(data)
    if(data){
      const deleteItem = monitors.filter(e => e._id !== id);
      setMonitors(deleteItem)
    }
    else{
      toast("Failed to delete")
    }
  }

  useEffect(() => {
    setProgress(50)
    setData();
    setProgress(100)
  }, [IsEdit])

  const setData = async() => {
    const data = await listMonitors();
    setMonitors(data)
  }
  
  const closeModal = () => {
    setEdit(false)
    setEditData(null);
    setIsModalVisible(false)
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
        <ListMonitors monitors={monitors} setMonitors={setMonitors} MonitorDelete={MonitorDelete} onFinish={() => setIsModalVisible(!isModalVisible)} setEdit={setEdit} setEditData={setEditData} />
      </div>
      }
      <Modal title={IsEdit ? "Add URL": "Edit URL"} visible={isModalVisible} className="modal" footer={false} onCancel={() => closeModal()} >
        <ModalForm onFinish={() => setIsModalVisible(!isModalVisible)} monitors={monitors} setMonitors={setMonitors} IsEdit={IsEdit} editData={editData} closeModal={closeModal} setEdit={setEdit} setEditData={setEditData} />
      </Modal>
      <Modal visible={IsDeleteModalVisible} onCancel={() => setIsDeleteModalVisible(false)}  >
        <p>Are you sure you want to delete the job?</p>
      </Modal>
    </div>
  )
}

export default Dashboard;
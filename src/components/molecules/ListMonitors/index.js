import React from 'react';
import "./listmonitors.scss";
import { Table, Button, Switch } from 'antd';
import {activateMonitor} from '../../../API/monitors'
import {useHistory} from 'react-router-dom'


const ListMonitors = ({monitors, setMonitors, onFinish, setEdit, setEditData, MonitorDelete, setEditId}) => {

  const history = useHistory()

  const editModal = (data, id) => {
    setEdit(true)
    setEditData(data)
    setEditId(id)
    onFinish()
  }
  const typeAddressOptions = ['address', "website"];

  const changeStatus = async(data, idx) => {
    data.status = !data.status
    monitors[idx] = data
    setMonitors(monitors)
    await activateMonitor(data._id, data.status)
  }

  const tableData = [
    {
      title: "Name",
      dataIndex: 'config',
      width: 200,
      render: (data) => <a>{data.title}</a>,
    },
    {
      title: "URL",
      dataIndex: 'config',
      render: (data) => <a href={data.website} target="_blank">{data[Object.keys(data).filter(x => typeAddressOptions.includes(x))[0]]}</a>,
      width: 250,
    },
    {
      title: "Status",
      dataIndex: 'config',
      render: (data, parentData, idx) =>  <Switch defaultChecked={parentData.status} onChange={() => changeStatus(parentData, idx)}  />,
      width: 200,
    },
    {
      title: "Logs",
      dataIndex: '_id',
      render: (id) => <a onClick={() => history.push(`/app/logs/?id=${id}`)}>View logs</a>,
      width: 200,
    },
    {
      title: "Action",
      dataIndex: '_id',
      render: (data) =>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Button onClick={() => editModal(monitors.find(x => x._id === data).config, data)} >Edit</Button>
        <Button onClick={() => MonitorDelete(data)}>Delete</Button>
      </div>,
       width: 200,
       align: "center",
    }
  ]

  return(
    <div className="dashboard-table-container" >
      <Table className="dashboard-table" columns={tableData} dataSource={monitors} />
    </div>
  )
}

export default ListMonitors
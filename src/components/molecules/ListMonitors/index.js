import React from 'react';
import "./listmonitors.scss";
import { Table, Button } from 'antd';



const ListMonitors = ({monitors, setMonitors, onFinish, setEdit, setEditData, MonitorDelete}) => {

  const editModal = (data) => {
    setEdit(true)
    setEditData(data)
    onFinish()
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
      render: (data) => <a href={data.website} target="_blank">{data.website}</a>,
      width: 250,
    },
    {
      title: "Status",
      dataIndex: 'config',
      render: (data) => <a>Active</a>,
      width: 200,
    },
    {
      title: "Logs",
      dataIndex: '_id',
      render: () => <a >View logs</a>,
      width: 200,
    },
    {
      title: "Action",
      dataIndex: '_id',
      render: (data) =>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Button onClick={() => editModal(monitors.find(x => x._id === data).config)} >Edit</Button>
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
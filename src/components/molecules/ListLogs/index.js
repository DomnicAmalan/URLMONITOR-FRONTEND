import React from 'react';
import { Table, Tag } from 'antd';

const ListLogs = ({ tableData }) => {

  const columns = [
    {
      title: "Start",
      dataIndex: 'createdAt',
      width: 200,
      render: (data) => <a>{data}</a>,
    },
    {
      title: "Finish",
      dataIndex: 'updatedAt',
      width: 200,
      render: (data) => <a>{data}</a>,
    },
    {
      title: "Response Time",
      dataIndex: 'responseTime',
      render: (data) => {return data === "-1" ? <Tag color="red">Server Down</Tag>: <Tag color="orange">Slow Response</Tag>},
      width: 250,
    },
    {
      title: "Message",
      dataIndex: 'message',
      render: (data) => <a>{data}</a>,
      width: 200,
    },
  ]

  return(
    <div className="dashboard-table-container" >
      <Table className="dashboard-table" columns={columns} dataSource={tableData} />
    </div>
  )
}

export default ListLogs;
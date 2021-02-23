import React, { useEffect, useState } from 'react';
import "./logs.scss";
import { getLogs} from '../../API/monitors';
import { ListLogs } from 'molecules';


const Logs = ({location}) => {
  let id = location.search.replace("?id=", "");

  const [logs, setLogs] = useState([])

  useEffect(() => {
    setData();
  }, [])

  const setData = async() => {
    const data = await getLogs(id)
    console.log(data)
    setLogs(data)
  }

  return(
    <div>
      <ListLogs tableData={logs} />
    </div>
  )
}

export default Logs;
import React, { useEffect, useState, useContext } from 'react';
import { getLogs, getMonitor } from '../../API/monitors';
import ListLogs from './ListLogs';

const Logs = ({location}) => {
  let id = location.search.replace("?id=", "");
  console.log(id)
  const [logs, setLogs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {    
    setData();
  }, [])

  const setData = async() => {
    const jobData = await getMonitor(id)
    setJobDetails(jobData);    
    const data = await getLogs(id);
    setLogs(data);
  }

  return (
    <div>
      <ListLogs tableData={logs} jobDetails={jobDetails} />
    </div>
  )
}
export default Logs;
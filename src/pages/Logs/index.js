import React, { useEffect, useState, useContext } from 'react';
import "./logs.scss";
import { getLogs, getMonitor } from '../../API/monitors';
import { ListLogs } from 'molecules';
import {LoadingContext} from 'hooks'

const Logs = ({location}) => {
  let id = location.search.replace("?id=", "");
  const {setProgress} = useContext(LoadingContext)
  const typeAddressOptions = ['address', "website"];

  const [logs, setLogs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [address, setAddress] = useState('')

  useEffect(() => {    
    setData();
  }, [])

  const setData = async() => {
    const jobData = await getMonitor(id)
    setJobDetails(jobData);
    setProgress(50);
    const type = Object.keys(jobData.config).filter(x => typeAddressOptions.includes(x))[0]
    setAddress(jobData.config[type])
    const data = await getLogs(id);
    setLogs(data);
    setProgress(100)
  }
  return(
    <div className="logs-container">
      <div className="url-container">
        <a href={address}>{address}</a>
      </div>
      <ListLogs tableData={logs} />
    </div>
  )
}

export default Logs;
import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Switch, Link, Box
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {activateEmail, deleteMonitor, activateMonitor} from '../../API/monitors';
import UpdateIcon from '@material-ui/icons/Update';
import {green, red, blue} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
var cronstrue = require('cronstrue');
import Chip from '@material-ui/core/Chip';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  container: {
    maxHeight: 440,
  },
  actions: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent:"flex-end"
  },
  drawer: {
    width: "30vw"
  },
  logIcon: {
    color: green[600],
    cursor: "pointer"
  },
  deleteIcon: {
    color: red[500],
    cursor: "pointer"
  },
  EditIcon: {
    color: blue[300],
    cursor: "pointer"
  },
  actionContainer: {
    display: "flex",
    flexDirection: "space-around"
  }
}))

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'address', label: 'Address', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'scheduledAt', label: 'Scheduler', minWidth: 100 },
  { id: 'logs', label: 'Logs', minWidth: 50 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
  // TODO
  // { id: 'mail', label: 'Activate Mail', minWidth: 100 }
];

const ListMonitors = ({monitors, setMonitors, editMenu, setEditData})=> {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const history = useHistory()
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const MonitorDelete = async(id) => {
    const data = await deleteMonitor(id);
    if(data){
      const deleteItem = monitors.filter(e => e._id !== id);
      setMonitors(deleteItem)
    }
    else{
      toast("Failed to delete")
    }
  }

  const setEdit = (data) => {
    setEditData(data)
    editMenu(true)
  }

  const changeStatus = async(idx, id, status) => {
    let temp = [...monitors]
    const {monitor} = await activateMonitor(id, status)
    console.log(monitor)
    temp[idx].status = monitor.status
    setMonitors(temp)
  }

  const changeMailStatus = async(idx, id, status) => {
    let temp = [...monitors]
    const {monitor} = await activateEmail(id, status)
    temp[idx].sendmail = monitor.sendmail
    setMonitors(temp)
  }

  const createData = () => {
    let value = []
    monitors.forEach((item, idx) => {
      const {config} = item
      value.push(
        { 
          name: config.name, 
          address: <Link href={config.address} variant="body2" target="_blank">{config.address}</Link>, 
          status: <Switch onChange={(e) => changeStatus(idx, item._id, !item.status)} checked={item.status} /> ,
          logs: <UpdateIcon className={classes.logIcon} onClick={() => console.log("red")} onClick={() => history.push(`/app/logs/?id=${item._id}`)} />,
          actions: 
          <Box
            className={classes.actionContainer}
          >
            <EditIcon className={classes.EditIcon} onClick={() => setEdit(item)} />
            <DeleteForeverIcon className={classes.deleteIcon} onClick={() => MonitorDelete(item._id)} />
          </Box>,
          scheduledAt: <Chip color="primary" label={cronstrue.toString(config.cron)} />,
          // TODO
          // mail: <Switch onChange={(e) => changeMailStatus(idx, item._id, !item.sendmail)} checked={item.sendmail} /> ,

        }
      )
    })
    return value
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {createData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={monitors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ListMonitors;
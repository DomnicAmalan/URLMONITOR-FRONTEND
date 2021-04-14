import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Switch, Chip, Box, Typography, Modal
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import {green, red, blue} from '@material-ui/core/colors';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import JSONInput from 'react-json-editor-ajrm';

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
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const columns = [
  { id: 'start', label: 'Started At', minWidth: 170 },
  { id: 'finished', label: 'Finished At', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'responseTime', label: 'Response Time (ms)', minWidth: 100 },
  { id: 'message', label: 'Message', minWidth: 50 },
];


const ListLogs = ({ tableData, jobDetails }) => {
  const classes = useStyles()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [messageOpen, setOpenMessage] = React.useState(false);
  const [message, setMessage] = React.useState(null)

  const handleOpen = (message) => {
    setMessage(message)
    setOpenMessage(true);
  };

  const handleClose = () => {
    setMessage(null)
    setOpenMessage(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createData = () => {
    let value = []
    tableData.forEach((item, idx) => {
      console.log(item)
      // const {config} = item
      value.push(
        { 
          name: jobDetails.name, 
          start: <Typography>{item.createdAt}</Typography>, 
          finished: <Typography>{item.updatedAt}</Typography> ,
          status: <Chip color="primary" label={ item.responseTime === "-1" ? "Server Down": "Slow Response"} />,
          responseTime: <Chip label={ item.responseTime} />,
          message: <Typography style={{cursor:"pointer" }} onClick={() => handleOpen(item.message)}>{"View"}</Typography>
        }
      )
    })
    return value
  }

  return(
    <>
    {tableData.length ?
      <>
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
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={messageOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={messageOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Response Message</h2>
            <p id="transition-modal-description">
            {message ? JSON.stringify(message): "No Message"}
            </p>
          </div>
        </Fade>
      </Modal>
      </>
      :
      <div>
        No data
      </div>
    }
    </>
  )
}

export default ListLogs;
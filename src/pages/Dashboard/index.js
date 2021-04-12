import React from 'react';
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  Box,
  Button
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {colors} from '../../configs/colors'
import AddModal from './AddModal'
import RightDrawer from '../../components/RightDrawer'

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
  }
}))

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  // { id: 'code', label: 'ISO\u00a0Code', minWidth: 170 },
  // {
  //   id: 'population',
  //   label: 'Population',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
];

function createData(name) {
  // const density = population / size;
  return { name };
}

const rows = [
  createData('IN'),
  
];


const Dashboard = () => {
  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleDrawer = () => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

    setOpenDrawer(!openDrawer);
  };

  console.log(openDrawer)

  return (
    <Container 
      component="main" 
      maxWidth="lg"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Box
        maxWidth="lg"
        minHeight={"80px"}
        // mb={10}
        className={classes.actions}
      >
        <Button
          // variant="contained"
          color={colors.primary}
          className={classes.button}
          startIcon={<AddBoxIcon />}
          onClick={() => toggleDrawer(true)}
        >
          Add URL
        </Button>
      </Box>
      <RightDrawer open={openDrawer} toggle={toggleDrawer} className={classes.drawer}>
        <AddModal />
      </RightDrawer>
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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  )
}

export default Dashboard;
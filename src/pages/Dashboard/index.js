import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Container,
  Box,
  Button
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import {colors} from '../../configs/colors'
import AddModal from './AddModal'
import RightDrawer from '../../components/RightDrawer';
import ListMonitors from './ListModal';
import {listMonitors} from '../../API/monitors';

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

const Dashboard = () => {
  
  const classes = useStyles();
  const [monitors, setMonitors] = useState([])
  
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [editData, setEditData] = useState(null)
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };


  const getData = async() => {
    const resp = await listMonitors();
    setMonitors(resp)
  }

  useEffect(() => {
    getData()
  }, [])

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
        <AddModal monitors={monitors} setMonitors={setMonitors} editMenu={setOpenDrawer} editData={editData} />
      </RightDrawer>
      <ListMonitors monitors={monitors} setMonitors={setMonitors} editMenu={setOpenDrawer} setEditData={setEditData} />
    </Container>
  )
}

export default Dashboard;
import React from 'react';
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
  
  const [openDrawer, setOpenDrawer] = React.useState(false);

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
      <ListMonitors />
    </Container>
  )
}

export default Dashboard;
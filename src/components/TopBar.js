import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {colors} from '../configs/colors'
import { AuthenticationContext } from 'hooks';
import {Logout} from '../API/api'
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: colors.black
  },
  title: {
    flexGrow: 1,
    color: colors.black
  },
  AppBar: {
    backgroundColor: colors.yellow
  }
}));

export default function TopBar() {
  const classes = useStyles();
  const { IsAuthenticated } = useContext(AuthenticationContext)

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Ping Monitor
          </Typography>
          <Button color="primary" onClick={() => {IsAuthenticated ? Logout() : <Redirect to="/app" />}}>
            {IsAuthenticated ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
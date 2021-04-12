import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function RightDrawer({
  anchor="right",
  children,
  toggle,
  open,
  className
}) {
  const classes = useStyles();
  // const [drawerOpen, setDrawerOpen] = React.useState(false);

  

  return (
    <div>
      <Drawer anchor={anchor} open={open} onClose={() => toggle(false)} className={className} variant='temporary'  docked={true} >
        {children}
      </Drawer>
    </div>
  );
}
import React from 'react';
import {
  Typography
} from '@material-ui/core';
import TopBar from '../components/TopBar';

const MainLayout = ({children}) => {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  )
}
export default MainLayout
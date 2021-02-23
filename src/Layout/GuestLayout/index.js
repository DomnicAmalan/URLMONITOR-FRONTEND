import React, { useContext } from 'react';
import { Layout, Button } from 'antd';
const { Header } = Layout;
import "./guestlayout.scss";
import {Logout} from '../../API/api'
import { AuthenticationContext } from 'hooks';


const GuestLayout = ({children}) => {

  const { IsAuthenticated } = useContext(AuthenticationContext)
  console.log(IsAuthenticated)

  return (
    <Layout className="guest-layout">
      <Header className="header">
        <h1>Sparrow Ping</h1>
        {IsAuthenticated ? <Button className="button" onClick={() => Logout()}>Logout</Button> : null}
      </Header>
      <div className="guest-layout-children">{children}</div>
    </Layout>
  )
}

export default GuestLayout;
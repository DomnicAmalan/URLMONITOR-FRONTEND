import React, { useContext } from 'react';
import { Layout, Button } from 'antd';
const { Header } = Layout;
import "./guestlayout.scss";
import {Logout} from '../../API/api'
import { AuthenticationContext } from 'hooks';
import {Loading, Password} from 'atoms';

const GuestLayout = ({children}) => {

  const { IsAuthenticated } = useContext(AuthenticationContext)
  return (
    <Layout className="guest-layout">
      <Header className="header">
        <h1>Sparrow Ping</h1>
        {IsAuthenticated ? <Button className="button" onClick={() => Logout()}>Logout</Button> : null}
      </Header>
      <div className="guest-layout-children">{children}</div>
      <Loading />
    </Layout>
  )
}

export default GuestLayout;
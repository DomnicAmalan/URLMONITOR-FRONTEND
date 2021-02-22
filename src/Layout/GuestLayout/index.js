import React from 'react';
import { Layout, Button } from 'antd';
const { Header } = Layout;
import "./guestlayout.scss"

const GuestLayout = ({children}) => {
  return (
    <Layout className="guest-layout">
      <Header className="header">
        <h1>Sparrow Ping</h1>
        <Button className="button" onClick={() => {}}>Logout</Button>
      </Header>
      <div className="guest-layout-children">{children}</div>
    </Layout>
  )
}

export default GuestLayout;
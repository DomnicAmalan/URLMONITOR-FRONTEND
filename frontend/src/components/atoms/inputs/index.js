import React from 'react'
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Password = ({onChange}) => {
  return (
    <Input.Password
      className="input password"
      placeholder="input password"
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export {Password}
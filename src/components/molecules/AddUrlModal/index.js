import React, { useState } from 'react';
import { Slider, InputNumber, Row, Col, Input, Modal, Form, Select, Button, Typography } from 'antd';
import "antd/dist/antd.css";
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import {addMonitor} from '../../../API/monitors'

const { confirm } = Modal;


const ModalForm = ({onFinish}) => {

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };

  const typeAddressOptions = ['address', "website"];
  const units = ['seconds', 'milliseconds', 'minutes']

  const [typeOfAddress, setTypeOfAddress] = useState('');
  const [url, setURL] = useState('');
  const [title, setTitle]= useState('');
  const [port, setPORT] = useState('');
  const [intervalUnits, setIntervalUnits] = useState('');
  const [httpOptions, setHttpOptions] = useState({});
  const [expectedStatusCode, setExpectedStatusCode] = useState(200);
  const [interval, setInterval] = useState(5);
  const [httpOptionsGet, setHttpOptionsGet] = useState(false);

  const onFinishValues = async(values) => {
    const data = {
      [typeOfAddress]: url,
      confing: {
        intervalUnits
      },
      title,
      interval,
      expect: {
        statusCode: expectedStatusCode
      }
    }
    const resp = await addMonitor(data)
  }

  return (
    <Form 
      onFinish={onFinishValues}
      initialValues={{
        requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label={"Title"} required>
        <Input placeholder={"Name of your check"} onChange={(e) => setTitle(e.target.value)} value={title} />
      </Form.Item>
      <Form.Item label={"Type of url to check"} required>
        <Select
          placeholder="server or website"
          onChange={(value) => setTypeOfAddress(value)}
          allowClear
        >
          {typeAddressOptions.map((item) => {
            return(
              <Option key={'options'} value={item}>
                {item.toUpperCase()}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label={"Address"} required>
        <Input placeholder={"Website or server address"} value={url} onChange={(e) => setURL(e.target.value)}  />
      </Form.Item>
      <Form.Item label={"Interval"} required>
        <Row>
            <Col span={8}>
              <Select
              placeholder="server or website"
              onChange={(value) => setIntervalUnits(value)}
              allowClear
            >
              {units.map((item) => {
                return(
                  <Option key={'units'} value={item}>
                    {item.toUpperCase()}
                  </Option>
                )
              })}
            </Select>
          </Col>
          <Col span={12}>
            <Slider
              min={1}
              max={100}
              onChange={value => setInterval(value)}
              value={typeof interval === 'number' ? interval : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={100}
              style={{ margin: '0 16px' }}
              value={interval}
              onChange={value => setInterval(value)}
            />
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label={"Expected Status Code"} required>
        <Input value={expectedStatusCode} onChange={(e) => setExpectedStatusCode(e.target.value)} />
      </Form.Item>
      <Button onClick={() => setHttpOptionsGet(!httpOptionsGet)} >Advanced</Button>
      {httpOptionsGet ? <Form.Item>
        <JSONInput 
          id={"Dsds"}
          placeholder={{ path: '/users',
          method: 'post',
          query: {
            first_name: 'Que',
            last_name: 'Fire'
          },
          body: 'Hello World!' }}
          locale={ locale }
          height='200px'
          width="100%"
        />
      </Form.Item>: null}
      <Form.Item>
        <Button style={{width: "100%", background:"#161d6f"}} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ModalForm;
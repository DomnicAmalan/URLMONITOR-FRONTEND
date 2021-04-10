import React, { useEffect, useState, createRef } from 'react';
import { Slider, InputNumber, Row, Col, Input, Form, Select, Button } from 'antd';
import "antd/dist/antd.css";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { addMonitor, editMonitor } from '../../../API/monitors'
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Cron from 'react-cron-generator'
import 'react-cron-generator/dist/cron-builder.css'

let schema = yup.object().shape({
  typeOfAddress: yup.string().required(),
  url: yup.string().url().required(),
  title: yup.string().min(4).required(),
  // port: yup.number().min(4),
  intervalUnits: yup.string().required(),
  expectedStatusCode: yup.number(3).required(),
  interval: yup.string().required(),
});

const ModalForm = ({ onFinish, monitors, setMonitors, IsEdit, editData, closeModal, setEdit, editId }) => {

  const formRef = createRef();

  const typeAddressOptions = ['address', "website"];
  const units = ['seconds', 'milliseconds', 'minutes']

  const [typeOfAddress, setTypeOfAddress] = useState('');
  const [url, setURL] = useState('');
  const [title, setTitle] = useState(IsEdit ? editData.title : "");
  const [port, setPORT] = useState('');
  const [intervalUnits, setIntervalUnits] = useState(IsEdit ? editData.confing.intervalUnits : "");
  const [httpOptions, setHttpOptions] = useState({});
  const [expectedStatusCode, setExpectedStatusCode] = useState(200);
  const [interval, setInterval] = useState(IsEdit ? editData.interval : 5);
  const [httpOptionsGet, setHttpOptionsGet] = useState(false);
  const [cronValue, setCronValue] = useState('');

  const onFinishValues = async (values) => {
    schema.validate({
      typeOfAddress,
      url,
      title,
      port,
      intervalUnits,
      expectedStatusCode,
      interval,
    })
      .then(async resp => {
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
        addMonitor(data)
          .then((resp) => {
            setMonitors([...monitors, resp.monitor]);
            onFinish();
          })
          .catch(
            toast("Failed")
          )

      })
      .catch(function (err) {
        console.log(err)
        err.name; // => 'ValidationError'
        err.errors; // => ['Deve ser maior que 18']
      });

  }

  useEffect(() => {
    if (formRef.current) {
      formRef.current.resetFields()
    }
    if (IsEdit && editData) {
      const data = Object.keys(editData).filter(x => typeAddressOptions.includes(x))[0]
      setURL(editData[data])
      setTypeOfAddress(data)
      setPORT(editData.port)
    }
    return () => {
      if (formRef.current) {
        formRef.current.resetFields()
      }
    }
  }, [])

  return (
    <Form
      onFinish={onFinishValues}
      ref={formRef}
    >
      <Form.Item label={"Title"} required >
        <Input placeholder={"Name of your check"} onChange={(e) => setTitle(e.target.value)} value={title} />
      </Form.Item>
      <Form.Item label={"Type of url to check"} required>
        <Select
          placeholder="server or website"
          onChange={(value) => setTypeOfAddress(value)}
          allowClear
          value={typeOfAddress}
        >
          {typeAddressOptions.map((item) => {
            return (
              <Option key={'options'} value={item}>
                {item.toUpperCase()}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label={typeOfAddress === "website" ? "URL" : "Address"} required>
        <Row style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <Col style={{ display: "flex", width: typeOfAddress === "website" ? "100%" : "60%" }}>
            <Input placeholder={"Website or server address"} onChange={(e) => setURL(e.target.value)} value={url} />
          </Col>
          <Col style={{ display: "flex", width: "30%" }}>
            {typeOfAddress !== "website" ?
              <Input placeholder={"PORT"} onChange={(e) => setPORT(e.target.value)} value={port} /> : null
            }
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label={"Interval"} required>
        <Row>
          <Col span={8} style={{ paddingRight: 10 }}>
            <Select
              placeholder="server or website"
              onChange={(value) => setIntervalUnits(value)}
              allowClear
              value={intervalUnits}
            >
              {units.map((item) => {
                return (
                  <Option key={'units'} value={item}>
                    {item.toUpperCase()}
                  </Option>
                )
              })}
            </Select>
          </Col>
          <Col span={12}>
            <Slider
              min={5}
              max={100}
              onChange={value => setInterval(value)}
              value={typeof interval === 'number' ? interval : 5}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={5}
              max={100}
              style={{ margin: '0 16px' }}
              value={interval}
              onChange={value => setInterval(value)}
            />
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label={"Scheduler"} required>
        <Cron
          onChange={(e) => { setCronValue(e) }}
          value={cronValue}
          showResultText={true}
        // showResultCron={true}
        />
      </Form.Item>
      <Form.Item label={"Expected Status Code"} required>
        <Input value={expectedStatusCode} onChange={(e) => setExpectedStatusCode(e.target.value)} value={expectedStatusCode} />
      </Form.Item>
      <Button onClick={() => setHttpOptionsGet(!httpOptionsGet)} >Advanced</Button>
      {httpOptionsGet ? <Form.Item>
        <JSONInput
          id={"Dsds"}
          placeholder={{
            path: '/users',
            method: 'post',
            query: {
              first_name: 'Que',
              last_name: 'Fire'
            },
            body: 'Hello World!'
          }}
          locale={locale}
          height='200px'
          width="100%"
          value={httpOptions}
        />
      </Form.Item> : null}
      <Form.Item>
        <Button style={{ width: "100%", background: "#161d6f" }} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ModalForm;
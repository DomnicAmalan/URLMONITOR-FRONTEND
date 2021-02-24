import React, { useEffect, useState, createRef } from 'react';
import { Slider, InputNumber, Row, Col, Input, Form, Select, Button } from 'antd';
import "antd/dist/antd.css";
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import {addMonitor, editMonitor} from '../../../API/monitors'
import { toast } from 'react-toastify';

const ModalForm = ({onFinish, monitors, setMonitors, IsEdit, editData, closeModal, setEdit, editId }) => {

  const formRef = createRef();

  const typeAddressOptions = ['address', "website"];
  const units = ['seconds', 'milliseconds', 'minutes']

  const [typeOfAddress, setTypeOfAddress] = useState('');
  const [url, setURL] = useState('');
  const [title, setTitle]= useState(IsEdit ? editData.title: "");
  const [port, setPORT] = useState('');
  const [intervalUnits, setIntervalUnits] = useState(IsEdit ?  editData.confing.intervalUnits: "");
  const [httpOptions, setHttpOptions] = useState({});
  const [expectedStatusCode, setExpectedStatusCode] = useState(200);
  const [interval, setInterval] = useState(IsEdit ? editData.interval : 5);
  const [httpOptionsGet, setHttpOptionsGet] = useState(false);

  const validations = [
      {value: typeOfAddress, type: String, required: true},
      {value: url, type: String, required: true},
      {value: title, type: String, required: true},
      {value: port, type: String, required: false},
      {value: intervalUnits, type: String, required: true},
      {value: httpOptions, type: String, required: httpOptionsGet},
      {value: expectedStatusCode, type: String, required: true},
      {value: interval, type: String, required: true}
  ]

  const Validate = () => {
    const typeString = validations.filter(data =>  data.type === String && !Boolean(data.value) && data.required);
    const typeArray = validations.filter(data => data.type === Array && !data.value.length && data.required);
    const typeObject = validations.filter(data => data.type === "KeyValueObject" && !data.value.fileData && data.required);
  
    return Boolean(!typeString.length) && Boolean(!typeArray.length)  && Boolean(!typeObject.length)
  }
  
  const onFinishValues = async(values) => {
    if(Validate()){
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
      if(httpOptionsGet){
        data.httpOptions(setHttpOptions)
      }
      if(typeOfAddress === "address"){
        data.port = port
      }
      if(IsEdit){
        const {monitor} = await editMonitor(editId, data);
        const updateIndex = monitors.findIndex(x => x._id ===editId)
        monitors[updateIndex] = monitor
        setMonitors(monitors);
      }
      else{
        const resp = await addMonitor(data);
        setMonitors([...monitors, resp.monitor]);
      }
      
      onFinish();
    }
    else {
      toast("Please fill in required fields")
    }
    
  }  

  useEffect(() => {
    if(formRef.current){
      formRef.current.resetFields()
    }
    if(IsEdit && editData){
      const data = Object.keys(editData).filter(x => typeAddressOptions.includes(x))[0]
      setURL(editData[data])
      setTypeOfAddress(data)
      setPORT(editData.port)
    }
    return () => {
      if(formRef.current){
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
        <Input placeholder={"Name of your check"} onChange={(e) => setTitle(e.target.value)} value={title}  />
      </Form.Item>
      <Form.Item label={"Type of url to check"} required>
        <Select
          placeholder="server or website"
          onChange={(value) => setTypeOfAddress(value)}
          allowClear
          value={typeOfAddress}
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
      <Form.Item label={typeOfAddress === "website" ? "URL": "Address"} required>
        <Row style={{display: "flex", width:"100%", justifyContent: "space-between"}}>
          <Col style={{display: "flex", width: typeOfAddress === "website" ? "100%": "60%"}}>
            <Input placeholder={"Website or server address"}  onChange={(e) => setURL(e.target.value)} value={url}  />
          </Col>
          <Col style={{display: "flex", width: "30%"}}>
            {typeOfAddress !== "website" ? 
              <Input placeholder={"PORT"}  onChange={(e) => setPORT(e.target.value)} value={port}  />:null
            }
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label={"Interval"} required>
        <Row>
            <Col span={8} style={{paddingRight:10}}>
              <Select
              placeholder="server or website"
              onChange={(value) => setIntervalUnits(value)}
              allowClear
              value={intervalUnits}
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
      <Form.Item label={"Expected Status Code"} required>
        <Input value={expectedStatusCode} onChange={(e) => setExpectedStatusCode(e.target.value)} value={expectedStatusCode} />
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
          value={httpOptions}
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
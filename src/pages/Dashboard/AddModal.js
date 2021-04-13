import React from 'react';
import {
  makeStyles, Typography, Grid, CssBaseline, Container, Avatar,
  TextField, FormHelperText, Button, Select, MenuItem, Switch, Box
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import {colors} from '../../configs/colors'
import * as Yup from 'yup';
import { Formik, Field } from "formik";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
var cronstrue = require('cronstrue');
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { addMonitor, editMonitor } from '../../API/monitors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 600,
    alignItems: "center",
    "&.MuiFormHelperText-root.Mui-error" :{
      color: "red"
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 600
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colors.black,
  },
  form: {
    marginTop: theme.spacing(10),
    width: "100%",
  },
  input: {
    display: "flex",
    width: "100%",
    margin: theme.spacing(0,0,3),
    
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  JSONInput: {
    marginBottom: theme.spacing(10),
  }
}))

const checkValidCronExpression = (Expression) => {
  try {
    const normalized = cronstrue.toString(Expression)
    return true
  }
  catch {
    return false
  }
}

const validationSchema = Yup.object({
  name: Yup.string("Enter you name")
  .min(4)
  .required("Name is required"),
  type: Yup.string("Please select any option")
  .required("Choose the type of Website you need to monitor"),
  address: Yup.string("Enter the address").url("Hint: (http/https)://www.[domain].com \n (http/https)://192.168.0.1")
  .required("Address is required"),
  port: Yup.number("Ports can normally be like: 3000")
  .min(4),
  cron: Yup.string().test('Cron Test', 'Invalid Cron Expression',(value) => checkValidCronExpression(value)),
  expectedCode: Yup.number().test('len', 'Must be exactly 3 characters', val => val.toString().length === 3)
})

const AddModal = () => {
  const classes = useStyles();

  const handleSubmit = async(value, submit) => {
    submit(true)
    const resp = await addMonitor(value)
    console.log(resp)
    submit(false)
  }
  const typesoptions = ['api', 'website', 'server'];

  const SwitchComponents = (type) => {
    console.log(type)
    switch(type) {
      case 'api':
        return "https://api.test.com/v1"
      case 'website':
        return "https://www.google.com"
      case 'server':
        return "https://192.168.0.1"
    }
  }



  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add URL
        </Typography>
        <div className={classes.form}>
        <Formik
          initialValues={{ 
            name: "sdsds", 
            type: "website", 
            ssl: false, 
            cron: "5 * * * *",
            address: "http://www.google.com",
            httpOptions: {
              path: '{RELATIVE_PATH}',
              method: '{GET, PUT, POST, DELETE}',
              query: {first_name: 'Ping', last_name: "Pong"},
              body: {
                data: "Test"
              } 
            },
            port: null,
            portneeded: false
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={classes.input}
                helperText= {errors.name && touched.name && errors.name}
              />
              <TextField
                id="type"
                select
                label="Type"
                value={values.type}
                onChange={handleChange("type")}
                helperText={errors.type && touched.type && errors.type}
                variant="outlined"
                fullWidth
                className={classes.input}
              >
                {typesoptions.map(option => (
                  <MenuItem key={option} value={option}>
                    {option.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                variant="outlined"
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                className={classes.input}
                helperText= {errors.address && touched.address && errors.address}
                placeholder={SwitchComponents(values.type)}
              />
              <FormControlLabel
                style={{marginBottom: 15}}
                control={
                  <Switch
                    name="portneeded"
                    onChange={handleChange}
                    value={values.ignoreSSL}
                    
                  />
                }
                label="Port"
              />
              {
                values.portneeded ? 
                <TextField
                  variant="outlined"
                  fullWidth
                  id="port"
                  label="Port"
                  name="port"
                  autoComplete="port"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.port}
                  className={classes.input}
                  helperText={errors.port && touched.port && errors.port}
                />: null
              } 
              <FormControlLabel
                style={{marginBottom: 15}}
                control={
                  <Switch
                    name="ignoreSSL"
                    onChange={handleChange}
                    value={values.ignoreSSL}
                    
                  />
                }
                label="Ignore SSL"
              />
              <TextField
                variant="outlined"
                fullWidth
                id="cron"
                label="CRON Expression"
                name="cron"
                autoComplete="cron"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cron}
                className={classes.input}
                helperText= {errors.cron && touched.cron && errors.cron}
              />
              <TextField
                variant="outlined"
                fullWidth
                id="expectedCode"
                label="Expected Status Code"
                name="expectedCode"
                autoComplete="expectedCode"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.expectedCode}
                className={classes.input}
                helperText= {errors.expectedCode && touched.expectedCode && errors.expectedCode}
              />
              <FormControlLabel
                style={{marginBottom: 15}}
                control={
                  <Switch
                    name="apioptions"
                    onChange={handleChange}
                    value={values.apioptions}
                    
                  />
                }
                label="Advanced"
              />
              {values.apioptions ?
               <FormControlLabel
                // style={{marginBottom: 15, display: "flex", flexDirection: "column"}}
                className={classes.input}
                control={
                  <JSONInput
                    id={"httpOptions"}
                    placeholder={values.httpOptions}
                    name="httpOptions"
                    locale={locale}
                    height='200px'
                    width="100%"
                    onChange={(object) => setFieldValue('httpOptions', JSON.parse(object.json))}
                    value={values.httpOptions}
                    className={classes.JSONInput}
                    style={{marginBottom: 15}}
                  />
                }
              /> : null
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {isSubmitting ? <CircularProgress color="secondary" />: "Add"}
              </Button>
            </form>
          )}
        </Formik>
        </div>
      </div>
    </Container>
  )
}

export default AddModal;
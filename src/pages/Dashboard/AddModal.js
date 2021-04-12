import React from 'react';
import {
  makeStyles, Typography, Grid, CssBaseline, Container, Avatar,
  TextField, FormHelperText, Button, Select, MenuItem
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import {colors} from '../../configs/colors'
import * as Yup from 'yup';
import { Formik } from "formik";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 600,
    alignItems: "center"
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(10),
    display: "flex"
  },
  input: {
    display: "flex",
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const validationSchema = Yup.object({
  name: Yup.string("Enter you name")
  .min(4)
  .required("Name is required"),
  type: Yup.string("Please select any option")
  .required("Choose the type of Website you need to monitor")
})

const AddModal = () => {
  const classes = useStyles();

  const handleSubmit = (value, submit) => {
    console.log(value)
  }
  const typesoptions = ['api', 'website', 'server'];

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
          initialValues={{ name: "", type: "website" }}
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
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <FormHelperText>
                {errors.name && touched.name && errors.name}
              </FormHelperText>
              <TextField
                id="type"
                select
                label="Type"
                value={values.type}
                onChange={handleChange("type")}
                helperText={errors.type && touched.type && errors.type}
                margin="normal"
                variant="outlined"
              >
                {typesoptions.map(option => (
                  <MenuItem key={option} value={option}>
                    {option.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                  {isSubmitting ? <CircularProgress color="secondary" />: "Sign In"}
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
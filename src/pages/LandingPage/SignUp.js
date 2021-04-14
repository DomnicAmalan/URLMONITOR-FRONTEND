import React from 'react'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import * as Yup from 'yup';
import { colors } from "../../configs/colors";
import CircularProgress from '@material-ui/core/CircularProgress';
import { createUser, checkUser, authenticate } from '../../API/api';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
  .email("Enter a valid email")
  .required("Email is required"),
  password: Yup.string("")
  .min(8, "Password must contain at least 8 characters")
  .required("Enter your password"),
  passwordConfirmation: Yup.string("")
  .min(8, "Password must contain at least 8 characters")
  .required("Enter your password")
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colors.black,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const handleSubmit = async(user) => {
    const check = await checkUser(user);
    if(!check){
      const data = await createUser(user);
      if(data){
        const {jwt} = await authenticate(user);
        await setToken(jwt);
        // history.push("/app/dashboard");        
      }
      else{
        toast("User not created")
      }
    }
    else{
      toast("User already exist")
    }
    console.log(user)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={{ email: "", password: "", passwordConfirmation: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              {errors.email && touched.email && errors.email}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              {errors.password && touched.password && errors.password}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
              />

              {errors.passwordConfirmation && touched.passwordConfirmation && errors.passwordConfirmation}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                   {isSubmitting ? <CircularProgress color="secondary" />: "Sign Up"}
                </Button>
                <Grid container>
                  <Grid item xs>
                  </Grid>
                  <Grid item>
                    <Link href="/app/signin" variant="body2">
                      {"Already have account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
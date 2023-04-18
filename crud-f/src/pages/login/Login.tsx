import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
} from "@mui/material";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setIntialvalues] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values: any) => {
    setIntialvalues(values);
    const loggeduser: any = JSON.parse(localStorage.getItem("user") || "{}");
    if (
      values.email === loggeduser.email &&
      values.password === loggeduser.password
    ) {
      localStorage.setItem("loggedin", "true");
      navigate("/");
    } else {
      alert("Wrong Email or Password");
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
          handleChange,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack
              sx={{
                marginTop: 8,
                marginLeft: 30,
                marginRight: 30,
                gap: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email Address"
                  name="email"
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  onChange={(e) => {
                    setFieldValue(e.target.name, e.target.value);
                  }}
                />

                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onChange={(e) => {
                    setFieldValue(e.target.name, e.target.value);
                  }}
                />
              </Stack>
            </Stack>

            <Stack
              direction="row-reverse"
              alignItems="center"
              // justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Link
                component={RouterLink}
                variant="subtitle2"
                to="#"
                underline="hover"
              >
                Forgot password?
              </Link>
            </Stack>
            <Grid container>
              <Grid item>
                <Link href="http://localhost:3000/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Button size="large" type="submit" variant="contained">
              Login
            </Button>
            {/* </Box> */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;

import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider, Formik } from "formik";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Grid,
  Link,
} from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [initialValues, setIntialvalues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values: any) => {
    setIntialvalues(values);
    localStorage.setItem("user", JSON.stringify(values));
    navigate("/login");
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
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
                  label="First name"
                  name="firstName"
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  onChange={(e) => {
                    setFieldValue(e.target.name, e.target.value);
                  }}
                />

                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  onChange={(e) => {
                    setFieldValue(e.target.name, e.target.value);
                  }}
                />
              </Stack>

              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
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
              <Grid container>
                <Grid item>
                  <Link href="http://localhost:3000/login" variant="body2">
                    {"Existing User? Login"}
                  </Link>
                </Grid>
              </Grid>
              <Box>
                <Button size="large" type="submit" variant="contained">
                  Sign up
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signup;

import React, { useEffect, useState } from "react";
import { Grid, Paper, Button, Typography, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../../redux/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import axios from "axios";
import { AppDispatch, RootState } from "../../redux/configureStore";
import { editUser } from "../../redux/modules/users";

const UserEdit = () => {
  const paperStyle = { padding: "0 15px 40px 15px", width: 250 };
  const btnStyle = { marginTop: 10 };
  const phoneRegExp = /^[2-9]{2}[0-9]{8}/;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setIntialvalues] = useState({
    id: "",
    name: "",
    email: "",
    description: "",
  });
  useEffect(() => {
    loadUser();
  }, [id]);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3009/users/${id}`);
    console.log("result", result);
    setIntialvalues(result.data);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    // email: Yup.string().email("Enter valid email").required("Required"),
    description: Yup.string().min(2).required("Required"),
  });
  //   const numberofUsers = useSelector((state:RootState) => state.users.users.length);
  //   console.log("numberofUsers", numberofUsers);

  const onSubmit = (values: any) => {
    setIntialvalues(values);
    console.log("values", values);
    dispatch(editUser({ values, id }));
    navigate("/all-users");
  };

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid>
          <Typography variant="caption">Update user details here</Typography>
        </Grid>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, setFieldValue, errors, touched }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Field
                as={TextField}
                name="name"
                label="Name"
                value={values.name}
                fullWidth
                error={errors.name && touched.name}
                helperText={<ErrorMessage name="name" />}
                required
                onChange={(e: any) => {
                  setFieldValue(e.target.name, e.target.value);
                }}
              />

              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                error={errors.email && touched.email}
                helperText={<ErrorMessage name="email" />}
                disabled
                onChange={(e: any) => {
                  setFieldValue(e.target.name, e.target.value);
                }}
              />

              <Field
                as={TextField}
                name="description"
                label="Description"
                fullWidth
                error={errors.description && touched.description}
                helperText={<ErrorMessage name="description" />}
                required
                onChange={(e: any) => {
                  setFieldValue(e.target.name, e.target.value);
                }}
              />

              <Button
                type="submit"
                style={btnStyle}
                variant="contained"
                color="primary"
              >
                Update User
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default UserEdit;

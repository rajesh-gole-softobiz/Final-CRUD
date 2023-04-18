import React, { useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import moment from "moment";
import { AppDispatch, RootState } from "../../redux/configureStore";
import { addUser } from "../../redux/modules/users";
const { v4: uuidv4 } = require("uuid");
const { moment } = require("moment");

const UserAdd = () => {
  const paperStyle = { padding: "0 15px 40px 15px", width: 250 };
  const btnStyle = { marginTop: 10 };
  const phoneRegExp = /^[2-9]{2}[0-9]{8}/;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [initialValues, setIntialvalues] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    description: "",
    checkbox: "",
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    age: Yup.number().min(1).max(150).required("Age Required"),
    gender: Yup.string().required("Choose any option"),
    description: Yup.string().required("Description is Required"),
    checkbox: Yup.boolean().oneOf([true], "Please accept before submit"),
  });
  //   const numberofUsers = useSelector((state:RootState) => state.users.users.length);
  //   console.log("numberofUsers", numberofUsers);

  const onSubmit = (values: any) => {
    setIntialvalues(values);
    const id = uuidv4();
    const name = values.name;
    const email = values.email;
    const age = values.age;
    const gender = values.gender;
    const description = values.description;
    const checkbox = values.checkbox;

    const user = { id, name, email, age, gender, description, checkbox };

    dispatch(addUser(user));
    alert("New User Added");
    navigate("/all-users");
  };
  console.log("initialValues", initialValues);
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid>
          <Typography variant="caption">Fill new user details here</Typography>
        </Grid>
        <Formik
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
                required
              />

              <Field
                as={TextField}
                name="age"
                label="Age"
                fullWidth
                error={errors.age && touched.age}
                helperText={<ErrorMessage name="age" />}
                required
              />

              <Field
                as={RadioGroup}
                name="gender"
                label="Gender"
                error={errors.gender && touched.gender}
                // helperText={<ErrorMessage name="gender" />}
                required
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </Field>

              <Field
                as={TextField}
                name="description"
                label="Description"
                multiline
                maxRows={4}
                fullWidth
                error={errors.description && touched.description}
                helperText={<ErrorMessage name="description" />}
                required
              />
              <Field
                type="checkbox"
                name="checkbox"
                label="Accept"
                error={errors.checkbox && touched.checkbox}
                helperText={<ErrorMessage name="checkbox" />}
                required
              />

              <Button
                type="submit"
                style={btnStyle}
                variant="contained"
                color="primary"
              >
                Save User
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default UserAdd;

import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../../redux/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import axios from "axios";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from "../../redux/configureStore";
import { editUser } from "../../redux/modules/users";

const UserEdit = () => {
  const paperStyle = { padding: "0 15px 40px 15px", width: 250 };
  const btnStyle = { marginTop: 10 };
  const phoneRegExp = /^[2-9]{2}[0-9]{8}/;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { hobby } = useSelector((state: RootState) => ({
    hobby: state.users.hobby,
  }));

  const { id } = useParams();
  const [initialValues, setIntialvalues] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    gender: "",
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
    age: Yup.number().min(1).max(150).required("Age Required"),
    gender: Yup.string().required("Choose any option"),
    description: Yup.string().min(2).required("Required"),
  });
  //   const numberofUsers = useSelector((state:RootState) => state.users.users.length);
  //   console.log("numberofUsers", numberofUsers);

  const onSubmit = (values: any) => {
    values.hobbies = hobby;
    setIntialvalues(values);
    console.log("values", values);
    dispatch(editUser({ values, id }));
    alert("Users updated successfully");
    navigate(`/user/${id}`);
  };
  console.log("hobby", hobby);

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
                name="age"
                label="Age"
                fullWidth
                error={errors.age && touched.age}
                helperText={<ErrorMessage name="age" />}
                required
                onChange={(e: any) => {
                  setFieldValue(e.target.name, e.target.value);
                }}
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
                fullWidth
                error={errors.description && touched.description}
                helperText={<ErrorMessage name="description" />}
                required
                onChange={(e: any) => {
                  setFieldValue(e.target.name, e.target.value);
                }}
              />
              <Button
                variant="outlined"
                component={Link}
                to={`/user/hobby/${id}`}
              >
                Hobbies
              </Button>{" "}
              <h3>{hobby.join(",")}</h3>
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

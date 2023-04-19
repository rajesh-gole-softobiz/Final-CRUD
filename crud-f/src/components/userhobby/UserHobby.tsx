import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../redux/configureStore";
import { addHobby } from "../../redux/modules/users";

const UserHobby = ({ onSubmit }: any) => {
  const dispatch = useAppDispatch();
  const [hobbies, setHobbies] = useState([]);

  const formik = useFormik({
    initialValues: {
      hobbies: [],
    },
    validationSchema: Yup.object({
      hobbies: Yup.array().min(1, "Please select at least one hobby"),
    }),
    onSubmit: (values) => {
      setHobbies(values.hobbies);
      dispatch(addHobby(values.hobbies));
      onSubmit(values.hobbies);
    },
  });
  console.log("hobbies", hobbies);

  const handleHobbyChange = (e: any) => {
    const { value }: any = e.target;
    const updatedHobbies: any = [...formik.values.hobbies];
    if (updatedHobbies.includes(value)) {
      updatedHobbies.splice(updatedHobbies.indexOf(value), 1);
    } else {
      updatedHobbies.push(value);
    }
    formik.setFieldValue("hobbies", updatedHobbies);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControlLabel
        control={<Checkbox value="reading" onChange={handleHobbyChange} />}
        label="Reading"
      />
      <FormControlLabel
        control={<Checkbox value="writing" onChange={handleHobbyChange} />}
        label="Writing"
      />
      <FormControlLabel
        control={<Checkbox value="drawing" onChange={handleHobbyChange} />}
        label="Drawing"
      />
      <Button type="submit" variant="contained">
        Add Hobby
      </Button>
    </form>
  );
};

export default UserHobby;

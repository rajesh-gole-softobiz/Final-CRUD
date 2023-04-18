import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { RootState, useAppDispatch } from "../../redux/configureStore";
import { fetchUsers } from "../../redux/modules/users";

export default function UserInfo() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState([]);

  const { users } = useSelector((state: RootState) => ({
    users: state.users.users,
  }));
  useEffect(() => {
    dispatch(fetchUsers());
    setUserData([...userData, ...users]);
  }, []);

  const userDetails = users.filter((user) => {
    return user["id"] === params.id;
  });
  console.log("user info", users);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          {userDetails &&
            userDetails.map((user) => (
              <>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  User Details :
                </Typography>
                <Typography variant="h5" component="div">
                  {user["name"]}
                </Typography>
                <Typography variant="body1" component="div">
                  {user["email"] && `Email : ${user["email"]}`}
                </Typography>
                <Typography variant="body1" component="div">
                  {user["age"] && `Age : ${user["age"]}`}
                </Typography>
                <Typography variant="body1" component="div">
                  {user["gender"] && `Gender : ${user["gender"]}`}
                </Typography>
                <Typography variant="body1" component="div">
                  {user["description"] &&
                    `Description : ${user["description"]}`}
                </Typography>
              </>
            ))}
        </CardContent>
      </Card>
      <Button variant="contained" component={Link} to={`/dashboard`}>
        Back to Home
      </Button>
    </>
  );
}

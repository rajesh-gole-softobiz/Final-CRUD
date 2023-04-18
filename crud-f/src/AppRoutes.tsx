import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserView from "./pages/users/UserView";
import UserEdit from "./pages/users/UserEdit";
import UserAdd from "./pages/users/UserAdd";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Error from "./pages/error";
import ProtectedRoutes from "./protectedRoute/ProtectedRoutes";
import UserInfo from "./components/userinfo/UserInfo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/all-users" element={<UserView />} />
        <Route path="/edituser/:id" element={<UserEdit />} />
        <Route path="/adduser" element={<UserAdd />} />
        <Route path="/user/:id" element={<UserInfo />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

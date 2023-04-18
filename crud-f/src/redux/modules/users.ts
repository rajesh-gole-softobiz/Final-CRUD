import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { get } = require("superagent");
// const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// const { createAsyncThunk } = require("@reduxjs/toolkit");
// const { axios } = require("axios");

// const { v4: uuidv4 } = require("uuid");
// const moment = require("moment");

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { get } from 'superagent'

//View User
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response:any = await get("http://localhost:3009/users");
  return response.body;
});

//Add User
export const addUser = createAsyncThunk("users/adduser", async (data:object)=>{
  const response:any = await axios.post("http://localhost:3009/users",data);
  return response.data;
})

//Delete User
export const deleteUser = createAsyncThunk("users/deleteUser", async (id:any)=>{
  const response: any = await axios.delete(`http://localhost:3009/users/${id}`)
})

//Edit User
export const editUser = createAsyncThunk("users/editUser", async (data:any)=>{
  const response: any = await axios.put(`http://localhost:3009/users/${data.id}`, data.values);
  return response.data
})

export interface IState {
  users: [],
  loading: boolean,
  error: string | null
}
const initialUsers:IState = {
    users: [],
    loading: false,
    error: null
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsers,
  reducers: {},
  extraReducers: (builder:any) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUsers.pending, (state:any, action:any) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state:any, action:any) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state:any, action:any) => {
      console.log("error");
      state.error = "Something went Wrong";
      state.loading = false;
    });
  },
});

// export const { showUsers, addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;

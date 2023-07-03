import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (user) => {
  const { data } = await axios(`/rick-and-morty/login?email=${user.email}&password=${user.password}`);
  if (data.message) return alert(data.message);
  return data;
});

export const register = createAsyncThunk("user/register", async (user) => {
  const { data } = await axios.post("/rick-and-morty/login", user);
  if (data.message) return alert(data.message);
  return data;
});

export const postFav = createAsyncThunk("user/postFav", async (character) => {
  const { data } = await axios.post("/rick-and-morty/favorites", character);
  if (data.message) return alert("Email is already registered");
  return data;
});

export const deleteFav = createAsyncThunk("user/deleteFav", async ({ id, userId }) => {
  const { data } = await axios.delete(`/rick-and-morty/favorites/${id}?userId=${userId}`);
  if (data.message) return alert(data.message);
  return data;
});
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getCharacters = createAsyncThunk("characters/getCharacters", async () => {
  const { data } = await axios("/rick-and-morty/characters");
  return data;
});

export const getCharacter = createAsyncThunk("characters/getCharacter", async (id) => {
  const { data } = await axios(`/rick-and-morty/characters/${id}`);
  if (data.message) return alert(data.message);
  return data;
});

export const getSearchCharacters = createAsyncThunk("characters/getSearchCharacters", async (name) => {
  const { data } = await axios(`/rick-and-morty/characters?name=${name}`);
  if (data.message) return alert(data.message);
  return data;
});
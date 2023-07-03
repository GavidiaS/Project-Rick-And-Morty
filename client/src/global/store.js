import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import charactersReducer from './charactersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    characters: charactersReducer
  }
});

export default store;
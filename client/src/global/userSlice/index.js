import { createSlice } from "@reduxjs/toolkit";
import { login, register, postFav, deleteFav } from "./asyncThunk";

const initialState = {
  access: false,
  id: "",
  name: "",
  email: "",
  password: "",
  page: 1,
  favorites: [],
  favoritesOrigin: [],
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.access = false;
      state.id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.page = 1;
      state.favorites = [];
      state.favoritesOrigin = [];
    },
    resetPageFav: (state) => {
      state.page = 1;
    },
    resetFavorites: (state) => {
      state.favorites = state.favoritesOrigin;
    },
    nextPageFav: (state) => {
      state.page += 1;
    },
    prevPageFav: (state) => {
      state.page -= 1;
    },
    numPageFav: (state, action) => {
      state.page = action.payload;
    },
    filterFavStatus: (state, action) => {
      if (state.favorites.length === 0) {
        state.favorites = state.favoritesOrigin.filter(ch => ch.status === action.payload);
      } else {
        state.favorites = state.favorites.filter(ch => ch.status === action.payload);
      }
    },
    filterFavGender: (state, action) => {
      if (state.favorites.length === 0) {
        state.favorites = state.favoritesOrigin.filter(ch => ch.gender === action.payload);
      } else {
        state.favorites = state.favorites.filter(ch => ch.gender === action.payload);
      }
    },
    orderFavName: (state, action) => {
      state.favorites.sort((a, b) => {
        if (action.payload === "ASC") return a.name.localeCompare(b.name);
        if (action.payload === "DES") return b.name.localeCompare(a.name);
        return 0;
      });
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.access = action.payload.access;
      state.id = action.payload.user.id;
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.password = action.payload.user.password;
      state.favorites = action.payload.user.Favorites;
      state.favoritesOrigin = action.payload.user.Favorites;
      state.loading = false;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      alert("The email is not correct or is not registered");
    })
    .addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      alert(action.payload.registered);
      state.loading = false;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      alert("Mail already exists");
    })
    .addCase(postFav.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(postFav.fulfilled, (state, action) => {
      state.favorites = action.payload.Favorites;
      state.favoritesOrigin = action.payload.Favorites;
      state.loading = false;
    })
    .addCase(postFav.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      alert("Oops an error occurred");
    })
    .addCase(deleteFav.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteFav.fulfilled, (state, action) => {
      state.favorites = action.payload.Favorites;
      state.favoritesOrigin = action.payload.Favorites;
      state.loading = false;
    })
    .addCase(deleteFav.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      alert("Oops an error occurred");
    })
  }
});
export const { resetUser, resetPageFav, resetFavorites, nextPageFav, prevPageFav, numPageFav, filterFavStatus, filterFavGender, orderFavName } = userSlice.actions;
export default userSlice.reducer;
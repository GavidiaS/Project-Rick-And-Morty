import { createSlice } from "@reduxjs/toolkit";
import { getCharacters, getCharacter, getSearchCharacters } from "./asyncThunk";

const initialState = {
  page: 1,
  character: {},
  characters: [],
  charactersOrigin: [],
  loading: false,
  error: null
}

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    resetPage: (state) => {
      state.page = 1;
    },
    resetCharacter: (state) => {
      state.character = {};
    },
    resetCharacters: (state) => {
      state.characters = [...state.charactersOrigin];
    },
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      state.page -= 1;
    },
    numPage: (state, action) => {
      state.page = action.payload;
    },
    deleteCharacter: (state, action) => {
      state.characters = state.characters.filter(ch => ch.id !== action.payload);
    },
    filterStatus: (state, action) => {
      if (state.characters.length === 0) {
        state.characters = state.charactersOrigin.filter(ch => ch.status === action.payload);
      } else {
        state.characters = state.characters.filter(ch => ch.status === action.payload);
      }
    },
    filterGender: (state, action) => {
      if (state.characters.length === 0) {
        state.characters = state.charactersOrigin.filter(ch => ch.gender === action.payload);
      } else {
        state.characters = state.characters.filter(ch => ch.gender === action.payload);
      }
    },
    orderName: (state, action) => {
      state.characters.sort((a, b) => {
        if (action.payload === "ASC") return a.name.localeCompare(b.name);
        if (action.payload === "DES") return b.name.localeCompare(a.name);
        return 0;
      });
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCharacters.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
      state.charactersOrigin = action.payload;
      state.loading = false;
    })
    .addCase(getCharacters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      alert("Oops an error occurred");
    })
    .addCase(getCharacter.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCharacter.fulfilled, (state, action) => {
      state.character = action.payload;
      state.loading = false;
    })
    .addCase(getCharacter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      alert("Oops an error occurred");
    })
    .addCase(getSearchCharacters.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getSearchCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
      state.loading = false;
    })
    .addCase(getSearchCharacters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      alert("Character does not exist");
    })
  }
});
export const { resetSearch, resetPage, resetCharacter, resetCharacters, nextPage, prevPage, numPage, deleteCharacter, filterStatus, filterGender, orderName } = charactersSlice.actions;
export default charactersSlice.reducer;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a function to load user data from local storage
const loadUserFromLocalStorage = () => {
  const userJSON = localStorage.getItem("user");
  return userJSON ? JSON.parse(userJSON) : null;
};

const initialState = {
  token: "",
  user: loadUserFromLocalStorage(), // Load user data from local storage initially
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: string }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
      // Remove user data from local storage when logged out
      localStorage.removeItem("user");
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;

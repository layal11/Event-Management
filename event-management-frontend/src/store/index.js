import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: {
    authorization: {},
    email: "",
    interests: [],
    isActive: false,
    lastName: "",
    location: undefined,
    name: "",
    password: "",
    address: { city: "", country: "" },
    userName: "",
    userType: null,
    _id: "",
    loggedIn: false,
    event: { _id: "" },
    category: { _id: "" },
  },
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    islogin(userstate) {
      let user = {};
      try {
        console.log("INNN")
        user = JSON.parse(localStorage.getItem("user"));
        console.log(user)
        userstate.user = user;
      } catch (e) {}

      // userstate.user = localStorage.getItem("user");
    },
    login(userstate, action) {
      userstate.user = action.payload;
      userstate.user.loggedIn = true;
      userstate.user.event = { _id: "" };
      userstate.user.category = { _id: "" };
      console.log(userstate.user, { userstate });
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setEvent(userstate, action) {
      userstate.user.event._id = action.payload.id;
    },
    setCategory(userstate, action) {
      userstate.user.category._id = action.payload.id;
    },
  },
});

//STORE
const store = configureStore({
  reducer: loginSlice.reducer,
});
export const userAction = loginSlice.actions;

export default store; //to connect our react app to this store

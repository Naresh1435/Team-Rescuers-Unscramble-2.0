import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./slices/navSlice";
import userSlice from "./slices/userSlice";
const store = configureStore({
    reducer: {
        user : userSlice,
        nav : navSlice,
    },
});
export default store;
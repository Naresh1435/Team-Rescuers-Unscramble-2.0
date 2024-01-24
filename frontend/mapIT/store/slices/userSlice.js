import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin : false,
    userData : {},
    userID : null,
    location : null
}

const userSlice = createSlice({
    name : 'user',
    initialState : initialState,
    reducers : {
        login : (state,action)=>{
            state.isLogin = true,
            state.userData = action.payload.user;
            state.userID = action.payload.userID
        },
        logout : (state,action)=>{
            state.isLogin = false,
            state.userData = {}
        },
        location : (state,action)=>{
            state.location = action.payload.location
        }
    }
});
export const userActions =  userSlice.actions;
export default userSlice.reducer;
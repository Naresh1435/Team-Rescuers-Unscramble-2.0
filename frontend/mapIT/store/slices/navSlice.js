import defaultExport from "@react-native-firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNav : false,
    screen : null
}

const navSlice = createSlice({
    name : 'nav',
    initialState : initialState,
    reducers : {
        setNav : (state, action) =>{
            state.isNav = true,
            state.screen = action.payload.screen;
        },
        offNav : (state)=>{
            state.isNav = false,
            state.screen = null
        }
    }

});

export const navActions = navSlice.actions;

export default navSlice.reducer;
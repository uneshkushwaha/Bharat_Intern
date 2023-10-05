import { createSlice, configureStore } from "@reduxjs/toolkit";
//createSlice is a function that takes an object as an argument or perform some action
//configureStore it is a function that takes a configuration object as an argument and returns a Redux store instance.eg: reducer
//reducers is a property of the object that we pass to createSlice function ,eg: login,logout

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
    },
    reducers: {
        login(state) {//state is the current state of the store
            state.isLogin = true;//
        },
        logout(state) {
            state.isLogin = false;//
        },
    },
});
export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer,
});
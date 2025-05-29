import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userAuthSlice";
import themeSlice from "./themeSlice"

const store = configureStore({
    reducer: {
        userAuth: userAuthSlice,
        theme: themeSlice,
    }
})

export default store
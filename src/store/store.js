import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userAuthSlice";
import themeSlice from "./themeSlice"
import ChatSlice from "./ChatSlice"

const store = configureStore({
    reducer: {
        userAuth: userAuthSlice,
        theme: themeSlice,
        Chat: ChatSlice,
    }
})

export default store
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    loading: false,
    message: null,
}

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        login: (state, action)=>{
            state.status = true
            state.userData = action.payload
        },
        logout: (state)=>{
            state.status = false
            state.userData = null
        },
        setUser: (state, action)=>{
            state.status = true
            state.userData = action.payload
        },
        register: (state, action)=>{
            state.status = true
            state.userData = action.payload
        },
        refreshToken: (state, action)=>{
            state.userData = {...state.userData, refreshToken: action.payload}
        },
        setRole: (state, action)=>{
            state.userData = {...state.userData, role: action.payload}
        },
        setLoading: (state, action)=>{
            state.loading = action.payload
        },
        setMessage: (state, action)=>{
            state.message = action.payload
        }
    }
})

export const { login, logout, register, setUser, setRole, refreshToken, setLoading, setMessage } = userAuthSlice.actions


export default userAuthSlice.reducer
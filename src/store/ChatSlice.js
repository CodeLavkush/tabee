import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: 'offline',
    users: [],
    chats: [],
    groupChats: [],
    messages: [],
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setStatus: (state, action)=>{
            state.status = action.payload
        },
        setUsers: (state, action)=>{
            state.users = action.payload
        },
        setChats: (state, action)=>{
            state.chats = action.payload
        },
        setGroupChats: (state, action)=>{
            state.groupChats = action.payload
        },
        setMessages: (state, action)=>{
            state.messages = action.payload
        }
    }
})


export const { setChats, setUsers, setGroupChats, setLoading, setErrorMessage, setStatus, setMessages } = chatSlice.actions


export default chatSlice.reducer
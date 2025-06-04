import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: [],
    chats: [],
    chat: null,
    groupChats: [],
    messages: [],
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectedChat: (state, action)=>{
            state.chat = action.payload
        },
        setUsers: (state, action)=>{
            state.users = action.payload
        },
        setChats: (state, action)=>{
            state.chats = action.payload
        },
        addChat: (state, action)=>{
            const exists = state.chats.find(chat => chat._id === action.payload._id);
            if (!exists) {
                state.chats.push(action.payload);
            }
        },
        setGroupChats: (state, action)=>{
            state.groupChats = action.payload
        },
        setMessages: (state, action)=>{
            state.messages = action.payload
        },
        restChatState: ()=> initialState,
    }
})


export const { setChats, setUsers, setGroupChats, setLoading, setErrorMessage, setStatus, setMessages, addChat, selectedChat, restChatState } = chatSlice.actions


export default chatSlice.reducer
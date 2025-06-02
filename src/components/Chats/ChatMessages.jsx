import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMessages } from '../../api/chatApi';
import { setMessages as setMessagesSlice } from '../../store/ChatSlice';

function ChatMessages() {
    const chat = useSelector((state) => state.Chat.chat);
    const messagesSlice = useSelector((state)=> state.Chat.messages)
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])

    useEffect(()=> {
        const getMessages = async ()=> {
            try {
                const data = await getAllMessages(chat?._id).then((res)=> res.data)
                if(data){
                    setMessages(data)
                    dispatch(setMessagesSlice(messages))
                }
            } catch (error) {
                console.error(error)
            }
        }
        getMessages()
    }, [chat, messagesSlice])
  return (
    <div className="w-full h-140 p-2">
      <ScrollArea className="h-full w-full rounded-md border-1 border-white">
        <div className="p-4 flex flex-col gap-2 ">
            {!messages[0] ? (<p>No messages yet.</p>) : ( messages.map((message)=> (
                <div className='w-full border-white border-1 rounded-xl flex justify-center p-2 flex-col'>
                    <div className='text-sm'>{message?.sender.username}</div>
                    <div>{message?.content}</div>
                </div>
                
            )))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ChatMessages;

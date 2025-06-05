import React, { useEffect, useState } from 'react';
import { userChatList } from '../../api/chatApi';
import { useDispatch, useSelector } from 'react-redux';
import { setChats as setChatsSlice, selectedChat } from '../../store/ChatSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/Button';
import { setMessage } from '../../store/userAuthSlice';
import Socket from '../../Socket';

function ListChats() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.Chat.chats);
  const currentChat = useSelector((state)=> state.Chat.chat)
  const user = useSelector((state)=> state.userAuth.userData)

  useEffect(() => {
    const listChats = async () => {
      try {
        const data = await userChatList().then((res) => res.data);
        if (data) {
          dispatch(setChatsSlice(data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    listChats();
  }, [dispatch]);

  const handleSelectedChat = (chat)=>{
    if (currentChat?._id && currentChat._id !== chat._id) {
      // Leave previous chat room before joining the new one
      Socket.emit("leaveChat", currentChat._id);
    }
    Socket.emit("joinChat", chat?._id);
    dispatch(selectedChat(chat))
    dispatch(setMessage({error: false, text: `${chat.name} selected`}))
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Chats</h4>
          {!chats[0] ? (
            <p>No chats yet.</p>
          ) : (
            chats.map((chat) => (
              <div className="w-full" key={chat._id}>
                <Button onClick={()=> handleSelectedChat(chat)} variant="ghost" className="text-sm w-full">
                  {chat.participants.map((participant)=> participant.username !== user.username ? participant.username : null)}
                </Button>
                <Separator className="my-2" />
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ListChats;

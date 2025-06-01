import React, { useEffect, useState } from 'react';
import { userChatList } from '../../api/chatApi';
import { useDispatch, useSelector } from 'react-redux';
import { setChats as setChatsSlice } from '../../store/ChatSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/Button';

function ListChats() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.Chat.chats);

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

  return (
    <div className="w-full h-full mt-10">
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Chats</h4>
          {!chats[0] ? (
            <p>No chats yet.</p>
          ) : (
            chats.map((chat) => (
              <div className="w-full" key={chat._id}>
                <Button variant="ghost" className="text-sm w-full">
                  {chat.name}
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

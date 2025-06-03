import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSelector, useDispatch } from 'react-redux';
import { deleteChatMessage, getAllMessages } from '../../api/chatApi';
import { setMessages as setMessagesSlice } from '../../store/ChatSlice';
import { Button } from '../index';
import { Trash2 } from 'lucide-react';
import { setMessage } from '../../store/userAuthSlice';
import Socket from '../../Socket';

const ChatMessages = forwardRef((props, ref) => {
  const chat = useSelector((state) => state.Chat.chat);
  const user = useSelector((state) => state.userAuth.userData);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);



  const fetchMessages = async () => {
    try {
      if (!chat?._id) return;
      Socket.emit("joinChat", chat?._id);

      const data = await getAllMessages(chat?._id).then((res) => res.data);
      if (data) {
        setMessages(data);
        dispatch(setMessagesSlice(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const res = await deleteChatMessage(chat?._id, messageId).then((res) => res);
      if (res) {
        dispatch(setMessage({ error: false, text: res.message }));

        Socket.emit('messageDeleted', {
        chatId: chat._id,
        messageId,
        });
        
        setMessages((prev) => prev.filter((m) => m._id !== messageId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chat]);

  useEffect(() => {
    if (!chat?._id) return;

    const handleNewMessage = (message) => {
      if (message.chat === chat?._id) {
        setMessages((prev) => {
            const updated = [message, ...prev];
            dispatch(setMessagesSlice(updated));
            return updated;
        });
      }
    };

    const handleMessageDeleted = ({ messageId }) => {
        setMessages((prev) => {
            const updatedMessages = prev.filter((m) => m._id !== messageId);
            dispatch(setMessagesSlice(updatedMessages));
            return updatedMessages;
        });
    };

    Socket.on('messageDeleted', handleMessageDeleted);

    Socket.on('messageReceived', handleNewMessage);

    return () => {
        Socket.off('messageDeleted', handleMessageDeleted);
        Socket.off('messageReceived', handleNewMessage);
    };
  }, [chat]);

  useImperativeHandle(ref, () => ({
    refreshMessages: fetchMessages,
  }));

  return (
    <div className="w-full h-140 p-2">
      <ScrollArea className="h-full w-full rounded-md border-1 dark:border-white border-black">
        <div className={`p-4 flex justify-center flex-col h-auto w-full gap-2`}>
          {!messages[0] ? (
            <p className='text-black dark:text-white w-full h-full flex justify-center items-center'>No messages yet.</p>
          ) : (
            messages.map((message) => (
              <div
                key={message?._id}
                className={`rounded-xl w-full justify-center flex p-2 flex-col ${
                  user?._id === message?.sender._id ? "bg-primary w-60" : "bg-slate-600 w-60"
                }`}
              >
                <div className="text-sm font-bold tracking-wider">{message?.sender.username.toUpperCase()}</div>
                <div className='text-xl font-medium'>{message?.content}</div>
                {user?._id === message?.sender._id ? (
                  <div className="mt-4 w-full flex justify-end items-center">
                    <Button variant="destructive" onClick={() => deleteMessage(message?._id)}>
                      <Trash2 />
                    </Button>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
});

export default ChatMessages;

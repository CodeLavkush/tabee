import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, logout as authLogout } from '../../store/userAuthSlice';
import { useAuthActions } from '../../hooks/useAuthActions';
import { SendHorizonal, Inbox, User, Mail } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Users, ListChats, CreateChatForm, ChatMessages } from './index';
import { sendMessage as sendMessageAPI } from '../../api/chatApi';
import { restChatState, setMessages } from '../../store/ChatSlice';
import Socket from '../../Socket';
import { ModeToggle, Button } from '../index';

function ChatView() {
  const [chatMessage, setChatMessage] = useState([]);
  const typingTimeoutRef = useRef(null);
  const chatMessagesRef = useRef();
  const { userLogout } = useAuthActions();
  const [currentUserData, setCurrentUserData] = useState();
  const currentUser = useSelector((state) => state.userAuth.userData);
  const chat = useSelector((state) => state.Chat.chat);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await userLogout()
        .then((res) => {
          if (res.success) {
            dispatch(dispatch(setMessage({ error: false, text: res.message })));
          }
        })
        .finally(() => {
          Socket.disconnect();
          dispatch(restChatState())
          dispatch(authLogout());
        });
    } catch (error) {
      console.error(error);
    } finally {
      if (chat?._id) {
        Socket.emit('leaveChat', chat?._id);
      }
    }
  };

  useEffect(() => {
    setCurrentUserData(currentUser);
  }, [currentUser, currentUserData]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const data = await sendMessageAPI(chat?._id, chatMessage).then((res) => res.data);
      if (data) {
        dispatch(setMessages(data));
        chatMessagesRef.current?.refreshMessages();
      }

      Socket.emit('new_message', data);
    } catch (error) {
      console.error(error);
    } finally {
      setChatMessage('');
    }
  };

  return (
    <div className="text-white text-2xl h-screen w-screen flex justify-center items-center flex-col p-2">
      <div className="bg-secondary w-full h-full rounded-xl flex justify-between flex-col">
        <nav className="w-full h-auto bg-primary rounded-xl">
          <ul className="w-full flex justify-between items-center p-4">
            <li>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-4xl shadow-2xl text-black dark:text-white"
                  >
                    <Inbox />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Inbox</SheetTitle>
                    <SheetDescription>
                      In profile section there are listed users click one of tham to copy there id
                      and paste it here..
                    </SheetDescription>
                    <CreateChatForm />
                    <div className="w-full h-auto flex justify-center items-center mt-10">
                      <ListChats />
                    </div>
                  </SheetHeader>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </li>
            <li>
              <Popover>
                <PopoverTrigger>{chat?.participants.map((participant)=> participant.username !== currentUser.username ? participant.username : null)}</PopoverTrigger>
                <PopoverContent className="text-center">{`${chat?.participants[0].username} and ${chat?.participants[1].username}`}</PopoverContent>
              </Popover>
            </li>
            <li>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-4xl shadow-2xl text-black dark:text-white"
                  >
                    {currentUserData?.username.toUpperCase()}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Profile</SheetTitle>
                    <SheetDescription className="text-center">Your account info</SheetDescription>
                    <div className="w-full flex justify-center items-center flex-col gap-2">
                      <div className="flex justify-center items-center gap-2 w-full">
                        <User />
                        <p>{currentUserData?.username}</p>
                      </div>
                      <div className="flex justify-center items-center gap-2 w-full">
                        <Mail />
                        <p>{currentUserData?.email}</p>
                      </div>
                    </div>
                    <div className="w-full h-auto flex justify-end items-center">
                      <ModeToggle />
                    </div>
                    <div className="w-full h-auto flex justify-center items-center mt-10">
                      <Users />
                    </div>
                  </SheetHeader>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                    <Button variant={'destructive'} onClick={handleLogout}>
                      Logout
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </li>
          </ul>
        </nav>
        <ChatMessages ref={chatMessagesRef} />
        <div className="w-full">
          <form onSubmit={sendMessage} className="grid w-full gap-2 p-2">
            <Textarea
              className='text-white dark:text-black'
              placeholder="Type your message here."
              maxLength={200}
              value={chatMessage}
              onChange={(e) => {
                setChatMessage(e.target.value);

                if (chat?._id && currentUserData?.username) {
                  Socket.emit("typing", {
                    chatId: chat?._id,
                    username: currentUserData?.username,
                  });

                  if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

                  typingTimeoutRef.current = setTimeout(() => {
                    Socket.emit("stopTyping", {
                      chatId: chat._id,
                      username: currentUserData.username,
                    });
                  }, 800);
                }
              }}
            />{' '}
            <Button type="submit">
              <SendHorizonal /> Send message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatView;

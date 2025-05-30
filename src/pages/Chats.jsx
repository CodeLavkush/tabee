import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableUsers } from '../api/chatApi';
import { setMessage, logout as authLogout } from '../store/userAuthSlice';
import { useAuthActions } from '../hooks/useAuthActions';
import { Button } from '@/components/ui/button';
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

function Chats() {
  const { userLogout } = useAuthActions();
  const [data, setData] = useState();
  const [users, setUsers] = useState([])
  const currentUser = useSelector((state) => state.userAuth.userData);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await userLogout()
        .then((res) => {
          if (res.success) {
            dispatch(dispatch(setMessage({ error: false, text: res.message })));
          }
        })
        .finally(() => dispatch(authLogout()));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setData(currentUser);
  }, [currentUser, data]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getAvailableUsers().then((res) => res.data);
        setUsers(data)
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="text-white text-2xl h-screen w-screen flex justify-center items-center flex-col p-2">
      <div className="bg-secondary w-full h-full rounded-xl flex justify-between flex-col">
        <nav className="w-full h-auto bg-primary rounded-xl">
          <ul className="w-full flex justify-between items-center p-4">
            <li>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className='rounded-4xl shadow-2xl'>
                    <Inbox/>
                  </Button>
                </SheetTrigger>
                <SheetContent side='left'>
                  <SheetHeader>
                    <SheetTitle>Inbox</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
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
                <PopoverTrigger>lavkush</PopoverTrigger>
                <PopoverContent>Place content for the popover here.</PopoverContent>
              </Popover>
            </li>
            <li>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className='rounded-4xl shadow-2xl'>
                    P
                  </Button>
                </SheetTrigger>
                <SheetContent side='right'>
                  <SheetHeader>
                    <SheetTitle>Profile</SheetTitle>
                    <SheetDescription>
                      <div className='w-full flex justify-center items-center flex-col gap-2'>
                        <h2 className='w-full font-bold text-center'>Your info</h2>
                        <div className='flex justify-center items-center gap-2 w-full'>
                          <User/>
                          <p>{data?.username}</p>
                        </div>
                        <div className='flex justify-center items-center gap-2 w-full'>
                          <Mail/>
                          <p>{data?.email}</p>
                        </div>
                      </div>
                    </SheetDescription>
                      <div className='w-full h-full mt-10'>
                        <ScrollArea className="h-72 w-48 rounded-md border">
                          <div className="p-4">
                            <h4 className="mb-4 text-sm leading-none font-medium">Users</h4>
                            {users ? users.map((user) => (
                              <li className='list-none' key={user._id}>
                                <Button variant={"ghost"} className="text-sm">{user.username}</Button>
                                <Separator className="my-2" />
                              </li>
                            )) : ( <p>No users yet.</p>)}
                          </div>
                        </ScrollArea>
                      </div>
                  </SheetHeader>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                    <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </li>
          </ul>
        </nav>
        <div className="grid w-full gap-2 p-2">
          <Textarea placeholder="Type your message here." maxLength={200} />{' '}
          {/* TODO: Check max length in the backend */}
          <Button><SendHorizonal/> Send message</Button>
        </div>
      </div>
    </div>
  );
}

export default Chats;

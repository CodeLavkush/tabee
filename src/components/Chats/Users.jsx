import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getAvailableUsers } from '../../api/chatApi';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { setUsers as setUsersSlice } from '../../store/ChatSlice';
import { setMessage } from '../../store/userAuthSlice';

function Users() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getAvailableUsers().then((res) => res.data);
        if (data) {
          dispatch(setUsersSlice(data));
          setUsers(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const handleUserId = (id)=>{
    window.navigator.clipboard.writeText(id)
    dispatch(setMessage({error: false, text: 'User id Copied!'}))
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Users</h4>
          {!users[0] ? (
            <p>No users yet.</p>
          ) : (
            users.map((user) => (
              <div className="w-full" key={user._id}>
                <Button onClick={()=> handleUserId(user._id)} variant="ghost" className="text-sm w-full">
                  {user.username}
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

export default Users;

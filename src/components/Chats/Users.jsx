import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getAvailableUsers } from '../../api/chatApi';
import { Button } from '@/components/ui/Button'

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getAvailableUsers().then((res) => res.data);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="w-full h-full mt-10">
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Users</h4>
          {users ? (
            users.map((user) => (
              <div className="w-full" key={user._id}>
                <Button variant="ghost" className="text-sm w-full">
                  {user.username}
                </Button>
                <Separator className="my-2" />
              </div>
            ))
          ) : (
            <p>No users yet.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Users;

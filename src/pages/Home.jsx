import React from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from '../components/index';
import { Button } from '@/components/ui/Button'

function Home() {
  return (
    <div className="h-screen w-screen">
      <div className="bg-secondary h-14 flex justify-between p-2 md:p-4 items-center">
        <ModeToggle />
        <div className='flex justify-center gap-2 items-center'>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="outline">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from '../components/index';
import { Button } from '@/components/ui/button';

function Home() {
  return (
    <div className="h-screen w-screen">
      <nav className="bg-secondary w-full h-14 flex justify-between p-2 md:p-4 items-center">
        <h1 className="text-xl font-bold tracking-wider">TAbee</h1>
        <ModeToggle />
      </nav>
      <section className="w-full h-100 flex justify-center items-center mt-40">
        <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
          <h2 className='w-full h-auto text-center text-4xl font-bold tracking-wide'>Welcome to TAbee</h2>
          <p className='max-w-60 text-center font-medium tracking-tight text-sm'>Tired of using WhatsApp? Start chat with your friends on TAbee💬</p>
          <div className="flex justify-center gap-2 items-center">
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outline">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

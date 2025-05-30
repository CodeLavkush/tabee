import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner';
import { getAvailableUsers } from '../api/chatApi';

function Chats() {
  const [data, setData] = useState()
  const currentUser = useSelector((state)=> state.userAuth.userData)


  useEffect(()=>{
    setData(currentUser)
    if(data){
      toast("Message", {
        description: `${data?.username} is successfully logged in.`
      })
    }
  }, [currentUser, data])


  useEffect(()=>{
    const getUsers = async ()=>{
      try {
        const data = await getAvailableUsers().then((res)=> res.data)
        console.log(data);
      } catch (error) {
        console.error(error)
      }
    }

    getUsers()
  }, [])


  return(
    <div className='text-white text-2xl h-screen w-screen flex justify-center items-center flex-col'>
      <p className='text-2xl font-bold'>Chats</p>
      {data ? <div className='text-center text-lg tracking-wide'>
        <p>{data.username}</p>
        <p>{data.email}</p>
      </div> : null}
    </div>
  )
}

export default Chats
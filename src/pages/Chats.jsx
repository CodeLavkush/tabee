import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAvailableUsers } from '../api/chatApi';
import { setMessage } from '../store/userAuthSlice';

function Chats() {
  const [data, setData] = useState()
  const currentUser = useSelector((state)=> state.userAuth.userData)
  const dispatch = useDispatch()


  useEffect(()=>{
    setData(currentUser)
    if(data){
      dispatch(setMessage({error: false, text: `${data?.username} is successfully logged in.`}))
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
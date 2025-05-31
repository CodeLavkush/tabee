import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAvailableUsers } from '../api/chatApi';
import { setMessage, logout as authLogout } from '../store/userAuthSlice';
import {Button} from '../components/index'
import { useAuthActions } from '../hooks/useAuthActions';

function Chats() {
  const { userLogout } = useAuthActions()
  const [data, setData] = useState()
  const currentUser = useSelector((state)=> state.userAuth.userData)
  const dispatch = useDispatch()


  const handleLogout = async ()=>{
    try {
      await userLogout().then((res)=> {
        if(res.success){
          dispatch(dispatch(setMessage({error: false, text: res.message})))
        }
      }).finally(()=> dispatch(authLogout()))

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    setData(currentUser)
  }, [currentUser, data])

  useEffect(()=>{
    const getUsers = async ()=>{
      try {
        const data = await getAvailableUsers().then((res)=> res.data)
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
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div> : null}
    </div>
  )
}

export default Chats
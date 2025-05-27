import React from 'react'
import {Input, Button} from './index'
import { useForm } from 'react-hook-form'
import { getCurrentUser, login } from '../api/userAuth'
import {login as authLogin, setUser } from '../store/userAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {

  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const udata = useSelector((state)=> state.userAuth.userData)
  console.log(udata);
  
  

  const submit = async (userData)=>{
    try {
      const data = await login(userData).then((res)=> dispatch(authLogin(res.data.user)))
      if(data){
        await getCurrentUser().then((res)=> dispatch(setUser(res.data)))
        navigate('/chats')
      }else{
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='w-120 h-100 bg-gray-600 p-2 rounded-lg'>
        <form onSubmit={handleSubmit(submit)} className='h-full w-full flex justify-center items-center flex-col gap-4'>
          <Input placeholder="Username" {...register("username", {required: true})}/>
          <Input placeholder="Password" type="password" {...register("password", {required: true})}/>
          <Button bgColor='bg-purple-800' type='submit' className='w-30 h-8'>Login</Button>
        </form>
    </div>
  )
}

export default Login
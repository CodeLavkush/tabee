import React, { useEffect, useState } from 'react'
import {Input, Button} from './index'
import { useForm } from 'react-hook-form'
import { login } from '../api/userAuth'
import {login as authLogin } from '../store/userAuthSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { register, handleSubmit, formState: {errors}, } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (userData)=>{
    try {
      const user = await login(userData).then((res)=> res.data.user)
      dispatch(authLogin(user))
      if(user && user.isEmailVerified){
        navigate('/chats')
      }else{
        navigate('/verify-email/:token')
      }
    } catch (error) {
      console.error(error)
      navigate('/login')
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center p-4'>
      <div className='w-120 h-100 bg-secondary p-2 rounded-lg'>
        <form onSubmit={handleSubmit(submit)} className='h-full w-full flex justify-center items-center flex-col gap-4'>
          <Input placeholder="Username" {...register("username", {required: true})} aria-invalid={errors.username ? 'true' : 'false'}/>
          {errors.username?.type === "required" && ( <p className='text-warning-foreground bg-warning' role='alert'>username is required</p> )}
          <Input placeholder="Password" type="password" {...register("password", {required: true})} aria-invalid={errors.password ? 'true' : 'false'}/>
          {errors.password?.type === "required" && ( <p className='text-warning-foreground bg-warning' role='alert'>password is required</p> )}
          <Button bgColor='bg-primary' type='submit' className='w-30 h-8'>Login</Button>
        </form>
      </div>
    </div>
  )
}

export default Login
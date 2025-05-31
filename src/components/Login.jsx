import React, { useEffect, useState } from 'react'
import {Input, Button, LoadingButton} from './index'
import { useForm } from 'react-hook-form'
import {login as authLogin, setLoading, setMessage } from '../store/userAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthActions } from '../hooks/useAuthActions'

function Login() {
  const { login } = useAuthActions()
  const loading = useSelector((state)=> state.userAuth.loading)
  const { register, handleSubmit, formState: {errors}, } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (userData)=>{
    try {
      dispatch(setLoading(true))
      const res = await login(userData).then((res)=> res)
      
      dispatch(authLogin(res.data.user))
      if(res.data.user.isEmailVerified){
        if(res.success){
          dispatch(setMessage({error: false, text: res.message}))
        } 
        navigate('/chats')
      }else{
        navigate('/verify-email/:token')
      }
    } catch (error) {
      console.error(error)
      navigate('/login')
    }finally{
      dispatch(setLoading(false))
    }
  }

  return loading ? <div className='w-screen h-screen flex justify-center items-center p-4'><LoadingButton/></div> : (
    <div className='w-screen h-screen flex justify-center items-center p-4 light:text-black'>
      <div className='w-120 h-auto dark:bg-secondary bg-orange-200 rounded-lg p-4 flex justify-center items-center flex-col gap-6'>
        <h2 className='text-4xl font-bold mt-4 text-shadow-2xs w-full text-center'>Login</h2>
        <form onSubmit={handleSubmit(submit)} className='h-full w-full flex justify-center items-center flex-col gap-4'>
          <Input placeholder="Username" {...register("username", {required: true})} aria-invalid={errors.username ? 'true' : 'false'}/>
          {errors.username?.type === "required" && ( <p className='text-warning-foreground bg-warning' role='alert'>username is required</p> )}
          <Input placeholder="Password" type="password" {...register("password", {required: true})} aria-invalid={errors.password ? 'true' : 'false'}/>
          {errors.password?.type === "required" && ( <p className='text-warning-foreground bg-warning' role='alert'>password is required</p> )}
          <Button bgColor='bg-primary' type='submit' className='w-30 h-8'>Login</Button>
        </form>
        <p className='font-bold text-center'>Don't have an account <Link className='underline text-primary' to="/register">Register</Link> here.</p>
      </div>
    </div>
  )
}

export default Login
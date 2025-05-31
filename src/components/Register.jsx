import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { register as authRegister, setLoading, setMessage } from '../store/userAuthSlice'
import { register as apiRegister  } from '../api/userAuth'
import { Input, Button, LoadingButton } from './index'
import { useNavigate, Link } from 'react-router-dom'


function Register() {
    const loading = useSelector((state)=> state.userAuth.loading)
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = async (userData)=>{
        try {
            dispatch(setLoading(true))
            const data = await apiRegister(userData, dispatch).then((res)=> {
                useDispatch(setMessage({error: false, text: res.message}))
                return res.data
            })
            if(data){
                dispatch(authRegister(data.user))
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
            navigate('/register')
        } finally{
            dispatch(setLoading(false))
        }
    }

  return loading ? <div className='w-screen h-screen flex justify-center items-center p-4'><LoadingButton/></div> : (
    <div className='w-screen h-screen flex justify-center items-center p-4'>
        <div className='w-120 h-auto dark:bg-secondary bg-orange-200 rounded-lg flex justify-center items-center flex-col p-4 gap-6'>
            <h2 className='text-4xl font-bold mt-4 text-shadow-2xs w-full text-center'>Create Account</h2>
            <form onSubmit={handleSubmit(submit)} className='h-full w-full flex justify-center items-center flex-col gap-4'>
                <Input placeholder="Username" {...register("username", {required: true})} aria-invalid={errors.username ? 'true' : 'false'}/>
                {errors.username?.type === 'required' && ( <p className='bg-warning text-warning-foreground' role='alert'>username is required</p> )}
                <Input placeholder="Email" {...register("email", {required: true, validate: { matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"}})} aria-invalid={errors.email ? 'true' : 'false'}/>
                {errors.email?.type === 'required' && ( <p className='bg-warning text-warning-foreground' role='alert'>email is required</p> )}
                <Input placeholder="Password" type="password" {...register("password", {required: true})} aria-invalid={errors.password ? 'true' : 'false'}/>
                {errors.password?.type === 'required' && ( <p className='bg-warning text-warning-foreground' role='alert'>password is required</p> )}
                <Button bgColor='bg-primary' type='submit' className='w-30 h-8'>Register</Button>
            </form>
            <p className='font-bold text-center'>Already have an account? <Link className='underline text-primary' to="/Login">Login</Link> here.</p>
        </div>
    </div>
  )
}

export default Register
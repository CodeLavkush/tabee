import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { register as authRegister } from '../store/userAuthSlice'
import { register as apiRegister  } from '../api/userAuth'
import { Input, Button } from './index'
import { useNavigate } from 'react-router-dom'

function Register() {
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = async (userData)=>{
        try {
            const data = await apiRegister(userData).then((res)=> res.data)
            if(data){
                dispatch(authRegister(data.user))
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
            navigate('/register')
        }
    }
  return (
    <div className='w-screen h-screen flex justify-center items-center p-4'>
        <div className='w-120 h-100 bg-secondary p-2 rounded-lg'>
            <form onSubmit={handleSubmit(submit)} className='h-full w-full flex justify-center items-center flex-col gap-4'>
                <Input placeholder="Username" {...register("username", {required: true})} aria-invalid={errors.username ? 'true' : 'false'}/>
                {errors.username?.type === 'required' && ( <p className='bg-warning text-warning-foreground' role='alert'>username is required</p> )}
                <Input placeholder="Email" {...register("email", {required: true, validate: { matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"}})} aria-invalid={errors.email ? 'true' : 'false'}/>
                {errors.email?.type === 'required' && ( <p className='bg-warning text-warning-foreground' role='alert'>email is required</p> )}
                <Input placeholder="Password" type="password" {...register("password", {required: true})} aria-invalid={errors.password ? 'true' : 'false'}/>
                {errors.password?.type === 'required' && ( <p className='bg-warning text-warning-foreground' role='alert'>password is required</p> )}

                <Button bgColor='bg-purple-800' type='submit' className='w-30 h-8'>Register</Button>
            </form>
        </div>
    </div>
  )
}

export default Register
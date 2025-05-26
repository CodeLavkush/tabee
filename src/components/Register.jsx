import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { register as authRegister } from '../store/userAuthSlice'
import { register as apiRegister  } from '../api/userAuth'
import { Input, Button } from './index'

function Register() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()


    const submit = async (userData)=>{
        try {
            const data = await apiRegister(userData).then((res)=> res.data)
            if(data){
                dispatch(authRegister(data.user))
            }
            
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div className='w-120 h-100 bg-gray-600 p-2 rounded-lg'>
        <form onSubmit={handleSubmit(submit)} className='h-full w-full flex justify-center items-center flex-col gap-4'>
            <Input placeholder="Username" {...register("username", {required: true})}/>
            <Input placeholder="Email" {...register("email", {required: true, validate: { matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"}})}/>
            <Input placeholder="Password" type="password" {...register("password", {required: true})}/>
            <Button bgColor='bg-purple-800' type='submit' className='w-30 h-8'>Register</Button>
        </form>
    </div>
  )
}

export default Register
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage, setLoading } from '../store/userAuthSlice'
import { Button } from './index'
import { useAuthActions } from '../hooks/useAuthActions'
import {LoadingButton} from './index'

function VerifyEmail() {
    const { verifyEmail, resendVerificationEmail } = useAuthActions()
    const { token } = useParams()
    const navigate = useNavigate()
    const [isEmailVerified , setIsEmailVerified] = useState(false)
    const dispatch = useDispatch()
    const status = useSelector((state)=> state.userAuth.status)
    const loading = useSelector((state)=> state.userAuth.loading)
    
    const handleResendVerifyEmail = async ()=>{
        try {
           await resendVerificationEmail().then((res)=> {
                if(res.success){
                    dispatch(setMessage({error: false, text: res.message}))
                }
           })
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=>{
        const confirmEmail = async ()=>{
            try {
                setLoading(true)
                const emailToken = await verifyEmail(token).then((res)=> res.data)
                setIsEmailVerified(emailToken.isEmailVerified)
            } catch (error) {
                console.error(error)
            } finally{
                setLoading(false)
            }
        }
        confirmEmail()
    }, [token, navigate])

    return loading ? <LoadingButton/> : isEmailVerified ? 
        (
            <div className='h-screen w-screen flex justify-center items-center flex-col'>
                <p className='text-2xl font-bold'>Your email is verified.</p>
                <p className='text-xl tracking-widest font-light'><Link className='text-red-400 underline' to='/login' >Log</Link> into your account</p>
            </div>
        ) : !status ? (
            <div className='h-screen w-screen flex justify-center items-center flex-col gap-2'>
                <p className='text-2xl font-bold'>Hey you nerd!</p>
                <p className='text-lg tracking-wide'>Go first register yourself <Link className='text-primary underline' to='/register'>Register</Link></p>
            </div>
        ) : (
            <div className='w-screen h-screen flex justify-center items-center flex-col gap-4 p-4 text-center'>
                <p className='font-bold text-xl'>Your email is not verified please check your email.</p>
                <Button varient={'outline'} className="bg-secondary cursor-pointer" onClick={handleResendVerifyEmail}>Resend verification email</Button>
            </div>
        )
}

export default VerifyEmail
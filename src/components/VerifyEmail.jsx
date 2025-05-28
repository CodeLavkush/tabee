import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { verifyEmail, resendVerificationEmail, getCurrentUser } from '../api/userAuth'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userAuthSlice'


function VerifyEmail() {
    const { token } = useParams()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [isEmailVerified , setIsEmailVerified] = useState(false)
    const dispatch = useDispatch()

    const handleResendVerifyEmail = async ()=>{
        try {
            const message = await resendVerificationEmail().then((res)=> res.message)
            setMessage(message)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=>{
        const confirmEmail = async ()=>{
            try {
                const emailToken = await verifyEmail(token).then((res)=> res.data)
                setIsEmailVerified(emailToken.isEmailVerified)
                await getCurrentUser().then((res)=> dispatch(setUser(res.data)))
            } catch (error) {
                console.error(error)
            }
        }
        confirmEmail()
    }, [token, navigate])

    return isEmailVerified ? 
        (
            <div>Your email is verified. Start your<Link to='/chats' >Chats</Link></div>
        ) : 
        (
            <div>
                <p>Your email is not verified please check your email.</p>
                <button onClick={handleResendVerifyEmail}>Resend verification email</button>
                <p>{message}</p>
            </div>
        )
}

export default VerifyEmail
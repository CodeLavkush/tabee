import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../api/userAuth'
import { useDispatch } from 'react-redux'
import { verifyEmail as authVerifyEmail } from '../store/userAuthSlice'
import { getCurrentUser } from '../api/userAuth'


function VerifyEmail() {
    const { token } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const confirmEmail = async ()=>{
            try {
                const emailToken = await verifyEmail(token).then((res)=> res.data)
                const userData = await getCurrentUser().then((res)=> res.data)
                console.log(userData)
                if(emailToken.isEmailVerified && userData){
                    setTimeout(() => {
                        dispatch(authVerifyEmail(userData))
                        navigate('/chats')
                    }, 2000)
                }
            } catch (error) {
                console.error(error)
                navigate('/login')
            }
        }
        confirmEmail()
    }, [token, navigate])

  return (
    <div className='text-4xl text-white'>Verifying Email......</div>
  )
}

export default VerifyEmail
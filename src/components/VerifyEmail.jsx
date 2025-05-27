import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../api/userAuth'


function VerifyEmail() {
    const { token } = useParams()
    const navigate = useNavigate()

    const confirmEmail = async ()=>{
        try {
            const emailToken = await verifyEmail(token)
            if(emailToken){
                setTimeout(() => navigate('/chats'), 2000)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=>{
        confirmEmail()
    }, [token, navigate])

  return (
    <div className='text-4xl text-white'>Verifying Email......</div>
  )
}

export default VerifyEmail
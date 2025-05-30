import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const authStatus = useSelector((state)=> state.userAuth.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
    }, [authStatus, navigate, authentication])
  return <>{children}</>
}

export default Protected
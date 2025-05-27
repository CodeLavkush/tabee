import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Chats() {
  const [data, setData] = useState()
  const currentUser = useSelector((state)=> state.userAuth.userData)


  useEffect(()=>{
    setData(currentUser)
  }, [currentUser])


  return(
    <div className='text-white text-4xl'>
      Chats
      {data ? <div>{JSON.stringify(data)}</div> : null}
    </div>
  )
}

export default Chats
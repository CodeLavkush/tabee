import React, { forwardRef, useId } from 'react'

const Input = forwardRef(({
    type='text',
    className='',
    ...props
}, ref)=>{
    const id = useId()
    return(
        <div className='w-full flex justify-center items-center'>
            <input type={type} className={`outline-none border-white border-1 p-2 rounded-md shadow-2xl text-white ${className}`} {...props} id={id} ref={ref}/>
        </div>
    )
})

export default Input
import React, { forwardRef, useId } from 'react'
import { Input as UiInput } from '@/components/ui/input'

const Input = forwardRef(({
    type='text',
    className='',
    ...props
}, ref)=>{
    const id = useId()
    return(
        <div className='w-full flex justify-center items-center'>
            <UiInput type={type} className={`w-60 outline-none border-white border-1 p-2 rounded-md shadow-2xl text-white ${className}`} {...props} id={id} ref={ref}/>
        </div>
    )
})

export default Input
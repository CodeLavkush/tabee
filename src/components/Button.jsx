import React from 'react'
import { Button as UiButton} from '@/components/ui/Button'

function Button({
    children,
    type="button",
    bgColor='',
    className='',
    ...props
}) {
  return (
    <UiButton className={`outline-none border-none cursor-pointer active:scale-[0.9] text-white transition-all hover:${bgColor} ${bgColor} shadow-lg rounded-md ${className}`} type={type} {...props}>{children}</UiButton>
  )
}

export default Button
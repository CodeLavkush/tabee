import React from 'react'
import { Button as UiButton} from '@/components/ui/button'

function Button({
    children,
    type="button",
    bgColor='',
    className='',
    variant='',
    ...props
}) {
  return (
    <UiButton variant={variant} className={`outline-none border-none cursor-pointer active:scale-[0.9] text-white transition-all hover:${bgColor} ${bgColor} shadow-lg rounded-md ${className}`} type={type} {...props}>{children}</UiButton>
  )
}

export default Button
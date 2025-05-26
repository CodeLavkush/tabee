import React from 'react'

function Button({
    children,
    type="button",
    bgColor='',
    className='',
    ...props
}) {
  return (
    <button className={`outline-none border-none cursor-pointer active:scale-[0.9] text-white transition-all hover:bg-purple-900 ${bgColor} shadow-lg rounded-md ${className}`} type={type} {...props}>{children}</button>
  )
}

export default Button
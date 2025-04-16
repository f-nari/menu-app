import React from 'react'

type Props = {
    user_data:{
        email:string}
}

const Header = ({user_data:{email}}:Props) => {
  return (
    <div className='bg-amber-800'>
        <h1>{email}</h1>
    </div>
  )
}

export default Header
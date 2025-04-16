import React from 'react'

type Props = {
    user_data: {
        email: string
    }
}

const Header = ({ user_data: { email } }: Props) => {
    return (
        <div className=' h-15 flex flex-col justify-center text-right bg-white'>
            <div className='mr-5'>こんにちは{email}</div>
        </div>
    )
}

export default Header
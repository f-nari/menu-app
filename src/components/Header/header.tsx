import React from 'react'

type Props = {
    user_data: {
        email: string|null
    }
}

const Header = ({ user_data: { email } }: Props) => {
    return (
        <div className=' h-15 flex  justify-between text-right bg-white pt-6 rounded-2xl '>
            <h1 className="text-3xl ml-5 font-bold ">献立アプリ</h1>
            <div className='mr-5'>こんにちは{email}</div>
        </div>
    )
}

export default Header
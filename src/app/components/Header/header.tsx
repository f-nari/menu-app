'use client'

import { UserContext } from '@/context/UserContext'
import { createClient } from '@/utils/supabase/client'
import React, { useContext } from 'react'

// type Props = {
//     user_data: {
//         email: string | null
//     }
// }

// const Header = ({ user_data: { email } }: Props) => {
const Header = () => {
    const userEmail = useContext(UserContext);


    const signOut = async () => {
        console.log('ログアウト処理をします');
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        console.log('ｋろえがユーザーです', user);
        const { _error } = await supabase.auth.signOut()
    }
    return (
        <div className="h-16 flex justify-between items-center bg-white px-5 rounded-2xl ">
            <h1 className="text-3xl font-bold">献立アプリ</h1>
            <div className="flex flex-col items-end ">
                <form action={() => signOut()}>
                    <button type="submit" className="text-blue-600 hover:underline">
                        ログアウト
                    </button>
                </form>
                {/* <span className="text-sm text-gray-700">こんにちは、{email}</span> */}
                <span className="text-sm text-gray-700">こんにちは、{userEmail?.email ?? 'ゲストさん' }</span>
            </div>
        </div>

    )
}

export default Header
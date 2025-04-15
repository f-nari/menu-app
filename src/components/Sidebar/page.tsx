import Link from 'next/link'
import React from 'react'

const links_list = [{
    title: 'ホーム',
    url: '/'
}, {
    title: '献立作成',
    url: '/menu_creation'
}, {

    title: 'レシピ作成',
    url: '/recipe_creation'

}]
const Sidebar = () => {
    return (
        <div className='w-60'>
            <div className='bg-white m-2 rounded-2xl min-h-screen '>
                <div className='pt-10 pl-5 text-2xl text-[#7c7c7c] font-bold'>献立アプアプ</div>
                <div className='flex flex-col mt-8 pl-5'>
                    {links_list.map((items) => (
                        <Link key={items.url} href={items.url} className='mb-4   text-[#7c7c7c] text-2xl hover:text-black'>{items.title}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
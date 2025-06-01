'use client'

import Image from 'next/image'
import React from 'react'

type Props = {
    signedUrl: string | undefined
}

export const RecipeImage = ({ signedUrl }: Props) => {
    return (
        <>
            {signedUrl ? (
                <Image
                    src={signedUrl}
                    width={500}
                    height={500}
                    alt="レシピ画像"
                    className="rounded-2xl shadow-xl object-cover"
                />
            ) : (
                <div className='w-96 h-96 rounded-2xl shadow-xl object-cover '>
                    画像がありません
                </div>
            )}
        </>
    )
}

export default RecipeImage
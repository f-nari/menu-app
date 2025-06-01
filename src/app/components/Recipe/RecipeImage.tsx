'use client'

import Image from 'next/image'
import React from 'react'

type Props = {
    signedUrl: string | undefined
}

export const RecipeImage = ({ signedUrl }: Props) => {
    return (
        <>
            {signedUrl && (
                <Image
                    src={signedUrl}
                    width={500}
                    height={500}
                    alt="レシピ画像"
                    className="rounded-2xl shadow-xl object-cover"
                />
            )}
        </>
    )
}

export default RecipeImage
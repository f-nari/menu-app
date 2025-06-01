'use client'

import Link from 'next/link'
import React from 'react'

type Props ={
    getRecipeById:string,
    onReicpeDeleteButtonClicked:()=>void
}

export const Button = ({getRecipeById,onReicpeDeleteButtonClicked}:Props) => {
    return (
        <div className="flex justify-center space-x-4">
            <Link href={`/recipe_creation/${getRecipeById}`}>
                <button className="w-28 h-10 rounded bg-amber-100 font-bold text-amber-500 hover:text-black shadow">
                    編集する
                </button>
            </Link>
            <button
                onClick={onReicpeDeleteButtonClicked}
                className="w-28 h-10 rounded bg-red-500 font-bold text-white hover:bg-red-600 shadow"
            >
                削除する
            </button>
        </div>
    )
}

export default Button
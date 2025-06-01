'use client'

import React from 'react'
type Props = {
    memo:string | undefined
}

export const RecipeMemo = ({memo}:Props) => {
    return (
        <div className="flex flex-col grow">
            <h2 className="text-xl font-semibold mb-2">メモ</h2>
            <div className="w-full border border-gray-300 bg-white rounded-2xl p-4 min-h-[100px]">
                {memo ? memo : 'メモがありません'}
            </div>
        </div>
    )
}

export default RecipeMemo
'use client'
import React from 'react'

type Props = {
    setRecipeMemo:(value:string) => void;
}

export const RecipeCrationMemo = ({setRecipeMemo}:Props) => {
    return (
        <div className="flex flex-col">
            <h1 className="text-xl font-semibold mb-2">メモ</h1>
            <textarea
                placeholder="コツやポイント"
                className="w-full h-40 bg-[#f8f6f1] p-3 rounded-sm resize-none "
                onChange={(e) => setRecipeMemo(e.target.value)}
            />
        </div>
    )
}

export default RecipeCrationMemo
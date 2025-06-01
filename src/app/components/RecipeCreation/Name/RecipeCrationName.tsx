'use client'

import React from 'react'
type Props = {
    recipeName: string,
    setRecipeName:(value:string) => void
}

export const RecipeCrationName = ({recipeName,setRecipeName}:Props) => {
    return (
        <input
            type="text"
            placeholder="ハンバーグ"
            className="text-3xl bg-[#f8f6f1] p-2 rounded-sm"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
        />
    )
}

export default RecipeCrationName
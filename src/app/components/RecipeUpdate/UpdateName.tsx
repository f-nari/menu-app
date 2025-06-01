'use client'

import React from 'react'

type Props = {
    name: string,
    onRecipeNameImageFileMemoChanged: (e: React.ChangeEvent<HTMLInputElement>, type: 'name' | 'imageFile' | 'memo') => void
}

export const UpdateName = ({ name, onRecipeNameImageFileMemoChanged }: Props) => {
    return (
        <input
            type="text"
            defaultValue={name}
            placeholder="ハンバーグ"
            className="text-3xl bg-[#f8f6f1] p-2 rounded-sm"
            onChange={(e) => onRecipeNameImageFileMemoChanged(e, 'name')}
        />
    )
}

export default UpdateName
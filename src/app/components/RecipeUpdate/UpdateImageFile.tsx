'use client'

import React from 'react'
type Props = {
    onRecipeNameImageFileMemoChanged:(e: React.ChangeEvent<HTMLInputElement>, type: 'name' | 'imageFile' | 'memo') => void
}

export const UpdateImageFile = ({onRecipeNameImageFileMemoChanged}:Props) => {
    return (
        <div className="w-1/2">
            <div className="h-80 bg-[#f8f6f1] rounded-md flex items-center justify-center border">
                <input
                    type="file"
                    onChange={(e) => onRecipeNameImageFileMemoChanged(e, 'imageFile')}
                    className="text-center"
                />
            </div>
        </div>
    )
}

export default UpdateImageFile
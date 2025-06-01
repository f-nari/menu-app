'use client'

import React from 'react'

type Props ={
    onRecipeUpdateButtonClicked :()=> void
}

export const UpdateSave = ({onRecipeUpdateButtonClicked}:Props) => {
    return (
        <div className="text-right">
            <button
                type="submit"
                onClick={onRecipeUpdateButtonClicked}
                className="px-6 py-2 bg-green-400 text-white rounded hover:bg-green-500"
            >
                レシピ保存
            </button>
        </div>
    )
}

export default UpdateSave
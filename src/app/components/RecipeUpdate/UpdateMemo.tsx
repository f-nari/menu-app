'use client'

import React from 'react'

type Props ={
  memo:string,
  onRecipeNameImageFileMemoChanged:(e: React.ChangeEvent<HTMLInputElement>, type: 'name' | 'imageFile' | 'memo') =>void
}

export const UpdateMemo = ({memo,onRecipeNameImageFileMemoChanged}:Props) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold mb-2">メモ</h1>
      <input
        defaultValue={memo}
        placeholder="コツやポイント"
        className="w-full h-40 bg-[#f8f6f1] p-3 rounded-sm resize-none"
        onChange={(e) => onRecipeNameImageFileMemoChanged(e, 'memo')}
      />
    </div>
  )
}

export default UpdateMemo
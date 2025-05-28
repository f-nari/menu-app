'use client'

import { RecipeType } from '@/Types/types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const Recipe = () => {
  const [recipeData, setRecipeData] = useState<RecipeType>()
  const getRecipeById = usePathname().replace('/recipe/', '')
  const router = useRouter()

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      const res = await fetch(`/api/getidrecipes?id=${getRecipeById}`)
      const data = await res.json()
      setRecipeData(data)
    }
    fetchRecipeDetail()
  }, [getRecipeById])

  const onReicpeDeleteButtonClicked = async () => {
    const response = await fetch('/api/deleterecipe', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ recipeId: getRecipeById })
    })

    if (response.ok) {
      router.push('/')
    }

  }

  return (
    <div className="flex justify-center h-screen text-[#4a4a4a] bg-gray-50 px-4 py-6">
      <div className="w-full max-w-6xl flex flex-col h-full space-y-6">

        {/* 上ゾーン（画像と説明） */}
        <div className="flex space-x-6">
          {/* 画像ゾーン */}
          {recipeData?.signedUrl && (
            <Image
              src={recipeData.signedUrl}
              width={500}
              height={500}
              alt="レシピ画像"
              className="rounded-2xl shadow-xl object-cover"
            />
          )}

          {/* 説明ゾーン */}
          <div className="flex flex-col justify-start space-y-4">
            <h1 className="text-3xl font-bold">{recipeData?.name}</h1>
            <h2 className="text-lg font-semibold">材料</h2>
            <table className="table-auto border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">食材名</th>
                  <th className="border px-4 py-2">量</th>
                  <th className="border px-4 py-2">単位</th>
                </tr>
              </thead>
              <tbody>
                {recipeData?.recipeIngredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{ingredient.title}</td>
                    <td className="border px-4 py-2">{ingredient.quantity}</td>
                    <td className="border px-4 py-2">{ingredient.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* メモゾーン */}
        <div className="flex flex-col grow">
          <h2 className="text-xl font-semibold mb-2">メモ</h2>
          <div className="w-full border border-gray-300 bg-white rounded-2xl p-4 min-h-[100px]">
            {recipeData?.memo || 'メモがありません'}
          </div>
        </div>

        {/* 操作ボタン */}
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
      </div>
    </div>

  )
}

export default Recipe
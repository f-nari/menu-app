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
    <div className='flex justify-center  h-screen text-[#4a4a4a]'>
      {/* 詳細ゾーン */}
      <div className='w-11/12 flex flex-col  h-full '>
        {/* 上ゾーン */}
        <div className='flex mt-6' >
          <div>
            {recipeData ? <Image src={recipeData.recipeSignedurl} height={500} width={500} alt='' className='rounded-2xl shadow-xl'></Image> : null}
          </div>
          {/*説明ゾーン */}
          <div className='flex flex-col ml-3 '>
            <h1 className='text-3xl'>{recipeData?.recipeName}</h1>
            <p>材料</p>
            <div  >
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>食材名</th>
                    <th>量</th>
                    <th>単位</th>
                  </tr>
                </thead>
                {recipeData?.recipeIngredients.map((ingredient, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{ingredient.title}</td>
                      <td>{ingredient.quantity}</td>
                      <td>{ingredient.unit}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
        {/*下ゾーン memozorn*/}
        <div className='flex flex-col grow mt-5 '>
          <h1 className='h-6'>メモ</h1>
          <div className='w-full border grow rounded-2xl mb-2 '>
            {recipeData?.recipeMemo}
          </div>
        </div>
        <div className='flex justify-center'>
          <Link href={`/recipe_creation/${getRecipeById}`} className=' w-20 h-10 rounded-sm bg-amber-100 font-bold text-amber-400 hover:text-black mb-5 mr-5'>編集する</Link>
          <button onClick={() => onReicpeDeleteButtonClicked()} className=' w-20 h-10 rounded-sm bg-red-500 font-bold text-amber-400 hover:text-black mb-5'>削除する</button>
        </div>
      </div>
    </div>
  )
}

export default Recipe
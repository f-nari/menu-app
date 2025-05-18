'use client'

import { RecipeType } from '@/app/menu_creation/page'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const Recipe = () => {
  const [recipeDetail, setRecipeDetail] = useState<RecipeType>()
  const getRecipeById = usePathname().replace('/recipe/', '')

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      const res = await fetch(`/api/getidrecipes?id=${getRecipeById}`)
      const data = await res.json()
      setRecipeDetail(data)
    }
    fetchRecipeDetail()
  }, [getRecipeById])

  console.log(recipeDetail, "recipeDatailです");

  const deleteRecipeClick = async  () => {
    const response = await fetch('/api/deleterecipe', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ recipeId: getRecipeById })
    })
  }

  return (
    <div className='flex justify-center  h-screen text-[#4a4a4a]'>
      {/* 詳細ゾーン */}
      <div className='w-11/12 flex flex-col  h-full '>
        {/* 上ゾーン */}
        <div className='flex mt-6' >
          <div>
            {recipeDetail ? <Image src={recipeDetail.signedUrl} height={500} width={500} alt='' className='rounded-2xl shadow-xl'></Image> : null}
          </div>
          {/*説明ゾーン */}
          <div className='flex flex-col ml-3 '>
            <h1 className='text-3xl'>{recipeDetail?.name}</h1>
            <p>作成者 廣川郁也</p>
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
                {recipeDetail?.ingredientsDataList.map((ingredients, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{ingredients.ingredientName}</td>
                      <td>{ingredients.quantity}</td>
                      <td>{ingredients.unit}</td>
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
            {recipeDetail?.memo}
          </div>
        </div>
        <div className='flex justify-center'>
          <Link href={`/recipe_creation/${getRecipeById}`} className=' w-20 h-10 rounded-sm bg-amber-100 font-bold text-amber-400 hover:text-black mb-5 mr-5'>編集する</Link>
          <button onClick={() => deleteRecipeClick()} className=' w-20 h-10 rounded-sm bg-red-500 font-bold text-amber-400 hover:text-black mb-5'>削除する</button>
        </div>
      </div>
    </div>
  )
}

export default Recipe
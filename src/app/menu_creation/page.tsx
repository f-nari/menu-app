'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export type RecipeType = {
  id: string
  created_at: string,
  name: string,
  memo: string,
  signedUrl: string
}

const Menu_Creation = () => {
  const [recipeLists, setRecipeLists] = useState<RecipeType[]>([])
  //useEffectでrecipelistを取得

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch('/api/allgetrecipes')
      const data = await res.json()
      setRecipeLists(data)
    }
    fetchRecipes()
  }, [])



  return (
    <div className="w-full flex justify-center h-full">
      <div className="w-11/12 flex flex-col  text-center mt-6 ">
        {/* タイトルゾーン */}
        <div className=" flex justify-center flex-col ">
          <h1 className="text-3xl ">献立作成</h1>
        </div>
        {/* ここから献立作成 */}
        <div className="h-60 flex justify-between text-center ">
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12 ">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50  h-12">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
          <div className="w-50">
            <h3>１日目</h3>
            <form action="" className=" ">
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50">
                  <option value="">猫</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        {/* レシピゾーン */}
        <div className="w-full grid grid-cols-5 gap-4">
          {/* カード */}
          {recipeLists.map((recipeData) => (
            <div className=" w-50 h-60 shadow-md rounded-2xl mr-5" key={recipeData.id}>
              <div className="w-full  h-40 rounded-t-lg">
                {recipeData.signedUrl ?
                  <Image src={recipeData.signedUrl} width={500} height={500} alt="" className="rounded-t-lg"></Image>
                  :
                  <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-t-lg">
                    <span className="text-gray-600">画像がありません</span>
                  </div>
                }

              </div>
              <div>{recipeData.name}</div>
              <Link href={`/recipe/${recipeData.id}` }>詳細へ</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Menu_Creation
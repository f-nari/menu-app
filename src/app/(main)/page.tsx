'use client'

import React from 'react'
import RecipeCards from "@/app/components/RecipeCards/RecipeCards";
import MenuSchedule from '@/app/components/MenuSchedule/MenuSchedule';
import useSWR from 'swr'

export default function Home() {

  const fetcher = (url:string) => fetch(url).then(res => res.json())

  const { data: recipes, error, isLoading } = useSWR('/api/allgetrecipes', fetcher)

  if (isLoading) return <p>読み込み中...</p>
  if (error) return <p>エラーが発生しました</p>
  if (!recipes) return <p>データがありません</p>

  return (
    <div className="w-full flex justify-center overflow-auto">
      <div className="w-11/12 flex flex-col text-center mt-6 ">
        <h1 className="text-3xl font-bold mt-5 mb-3">献立作成</h1>
        <MenuSchedule recipesProps={recipes} />
        <h2 className="text-2xl mt-10 mb-4 font-semibold">レシピ一覧</h2>
        <RecipeCards recipes={recipes} />
      </div>
    </div>

  );
}

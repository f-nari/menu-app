'use client'

import React, { useEffect, useState } from 'react'
import RecipeCards from "@/app/components/RecipeCards/RecipeCards";
import { RecipeType } from "@/Types/types";
import MenuSchedule from '@/app/components/MenuSchedule/MenuSchedule';

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeType[]>([])
  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch('/api/allgetrecipes')
      const data = await res.json()
      setRecipes(data)
    }
    fetchRecipes()
  }, [])

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

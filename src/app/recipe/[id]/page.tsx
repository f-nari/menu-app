'use client'

import Button from '@/app/components/Recipe/Button'
import RecipeImage from '@/app/components/Recipe/RecipeImage'
import RecipeIngredients from '@/app/components/Recipe/RecipeIngredients'
import RecipeMemo from '@/app/components/Recipe/RecipeMemo'
import RecipeName from '@/app/components/Recipe/RecipeName'
import { RecipeType } from '@/Types/types'
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
        <div className="flex space-x-6">
          <RecipeImage
            signedUrl={recipeData?.signedUrl}
          />
          <div className="flex flex-col justify-start space-y-4">
            <RecipeName
              name={recipeData?.name}
            />
            <h2 className="text-lg font-semibold">材料</h2>
            <RecipeIngredients
              ingredients={recipeData?.recipeIngredients}
            />
          </div>
        </div>
        <RecipeMemo
          memo={recipeData?.memo}
        />
        <Button
          getRecipeById={getRecipeById}
          onReicpeDeleteButtonClicked={onReicpeDeleteButtonClicked}
        />
      </div>
    </div>

  )
}

export default Recipe
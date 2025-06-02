'use client'
import { saveRecipe } from '@/app/actions/recipeInsert'
import { Ingredients } from '@/Types/types'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    ingredients: Ingredients[],
    recipeMemo: string,
    recipeName: string,
    recipeImageFile: File | null,
}

export const RecipeCreationSave = ({ ingredients, recipeMemo, recipeName, recipeImageFile }: Props) => {
    const router = useRouter()

    const onRecipeSaveButtonClicked = async () => {
        const res = await saveRecipe({ ingredients, recipeMemo, recipeName, recipeImageFile })
        if (res === 'ok') {
            router.push('/')
        }
    }
    return (
        <div className="text-right">
            <button
                type="submit"
                onClick={onRecipeSaveButtonClicked}
                className="px-6 py-2 bg-green-400 text-white rounded hover:bg-green-500"
            >
                レシピ保存
            </button>
        </div>
    )
}

export default RecipeCreationSave
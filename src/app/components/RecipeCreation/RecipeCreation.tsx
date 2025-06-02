'use client'
import { UserContext } from '@/context/UserContext'
import { Ingredients } from '@/Types/types'
import React, { useContext, useState } from 'react'
import RecipeCreationSave from './Save/RecipeCreationSave'
import RecipeCrationMemo from './Memo/RecipeCrationMemo'
import RecipeCrationName from './Name/RecipeCrationName'
import RecipeCreationIngredients from './Ingredients/RecipeCreationIngredients'

export const RecipeCreationComponents = () => {
    const [recipeImageFile, setRecipeImageFile] = useState<File | null>(null)
    const [recipeName, setRecipeName] = useState('')
    const [ingredients, setIngredients] = useState<Ingredients[]>([{
        id: 1, title: '', quantity: 0, unit: ''
    }])
    const [recipeMemo, setRecipeMemo] = useState('')
    const [ingredientsArrayId, setIngredientsArrayId] = useState(2)
    const userEmail = useContext(UserContext)

    const onIngredientChanged = (e: React.ChangeEvent<HTMLInputElement>, genre: 'title' | 'quantity' | 'unit', id: number) => {
        //title,unitならstringのため、そのままで良いが、quantityだった場合、numberである必要があるため、eを変換しなければならない
        const changeValue = genre === 'quantity' ? Number(e.target.value) : e.target.value
        const updataIngredients = ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, [genre]: changeValue } : ingredient
        )
        setIngredients(updataIngredients)
    }

    const onEmptyIngredientAddButtunClicked = () => {
        const updataIngredients = [...ingredients, { id: ingredientsArrayId, title: '', quantity: 0, unit: '' }]
        setIngredientsArrayId(ingredientsArrayId => ingredientsArrayId += 1)
        setIngredients(updataIngredients)
    }

    const onIngredientDeleteButtonClicked = (id: number) => {
        const updateIngredients = ingredients.filter(ingredient => ingredient.id !== id)
        setIngredients(updateIngredients)
    }

    return (
        <div className="w-11/12 flex flex-col space-y-6  overflow-auto ">
            <div className="flex gap-6">
                <div className="w-1/2">
                    <div className="h-80 bg-[#f8f6f1] rounded-md flex items-center justify-center">
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setRecipeImageFile(file)
                            }}
                            className="text-center"
                        />
                    </div>
                </div>
                <div className="w-1/2 flex flex-col space-y-4">
                    <RecipeCrationName setRecipeName={setRecipeName} recipeName={recipeName} />
                    <input
                        type="text"
                        placeholder={userEmail?.email}
                        className="bg-[#f8f6f1] p-2 rounded-sm"
                    />
                    <p className="text-2xl font-bold mt-2">材料</p>
                    <RecipeCreationIngredients
                        ingredients={ingredients}
                        onIngredientChanged={onIngredientChanged}
                        onIngredientDeleteButtonClicked={onIngredientDeleteButtonClicked}
                    />
                    <button onClick={onEmptyIngredientAddButtunClicked} className="mt-2 px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                        材料追加
                    </button>
                </div>
            </div>
            <RecipeCrationMemo
                setRecipeMemo={setRecipeMemo}
            />
            <RecipeCreationSave
                ingredients={ingredients}
                recipeMemo={recipeMemo}
                recipeName={recipeName}
                recipeImageFile={recipeImageFile}
            />
        </div>
    )
}

export default RecipeCreationComponents
'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Ingredients, PostRecipeDateil, } from '@/Types/types'
import UpdateSave from '@/app/components/RecipeUpdate/UpdateSave'
import UpdateMemo from '@/app/components/RecipeUpdate/UpdateMemo'
import UpdateIngredients from '@/app/components/RecipeUpdate/UpdateIngredients'
import UpdateName from '@/app/components/RecipeUpdate/UpdateName'
import UpdateImageFile from '@/app/components/RecipeUpdate/UpdateImageFile'
import { uploaaRecipeImage } from '@/app/actions/uploadImages'
import useSWR from 'swr'

type FetchIdRecipe = {
    created_at: string,
    genre: null
    id: number
    image_url: File
    memo: string
    name: string
    recipeIngredients: Ingredients[]
    signedUrl: string
    updated_at: string
    user_id: string
}


const Recipe_Creation = () => {
    const [recipe, setRecipe] = useState<PostRecipeDateil>({
        recipeName: '',
        recipeImageFile: null,
        recipeMemo: '',
        ingredients: [{
            id: 0, title: '', quantity: 0, unit: ''
        }],
    })
    const [ingredintsArrayId, setIngredientsArrayId] = useState(1)
    const getRecipeById = usePathname().replace('/recipe_creation/', '')
    const router = useRouter()

    const fetcher = (url: string) => fetch(url).then(res => res.json())

    const { data } = useSWR<FetchIdRecipe>(`/api/getidrecipes?id=${getRecipeById}`, fetcher)

    useEffect(() => {
        const fetchRecipeDeta = async () => {
            const newIngredients: Ingredients[] = []
            let currentIngredientArrayId = ingredintsArrayId;

            if (data) {
                data.recipeIngredients.forEach(i => {
                    newIngredients.push({
                        id: currentIngredientArrayId, title: i.title, quantity: i.quantity, unit: i.unit,
                    })
                    currentIngredientArrayId += 1
                })

                const recipe: PostRecipeDateil = {
                    recipeName: data.name,
                    recipeImageFile: data.image_url,
                    recipeMemo: data.memo,
                    ingredients: newIngredients
                }

                setRecipe(recipe)
                setIngredientsArrayId(currentIngredientArrayId)
            }else{
                return undefined
            }

        }
        fetchRecipeDeta()
    }
        , [data])

    const onIngredienteChanged = (e: React.ChangeEvent<HTMLInputElement>, genre: 'title' | 'quantity' | 'unit', id: number) => {
        const ingredients = recipe.ingredients
        //title,unitならstringのため、そのままで良いが、quantityだった場合、numberである必要があるため、eを変換しなければならない
        const changeData = genre === 'quantity' ? Number(e.target.value) : e.target.value
        const newIngredients = ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, [genre]: changeData } : ingredient
        )
        const newRecipe: PostRecipeDateil = {
            recipeName: recipe.recipeName,
            recipeImageFile: recipe.recipeImageFile,
            recipeMemo: recipe.recipeMemo,
            ingredients: newIngredients
        }
        setRecipe(newRecipe)
    }

    const omEmptyIngredientsAddButtonClicked = () => {
        const updateIngredents = [...recipe.ingredients, { id: ingredintsArrayId, title: '', quantity: 0, unit: '' }]
        const newRecipe: PostRecipeDateil = {
            recipeName: recipe.recipeName,
            recipeImageFile: recipe.recipeImageFile,
            recipeMemo: recipe.recipeMemo,
            ingredients: updateIngredents
        }
        setIngredientsArrayId(ingredintsArrayId => ingredintsArrayId += 1)
        setRecipe(newRecipe)
    }

    const onDeleteIngredientButtonClicked = (id: number) => {
        const ingredients = [...recipe.ingredients]
        const newIngredients = ingredients.filter(item => item.id !== id)
        const newRecipe: PostRecipeDateil = {
            recipeName: recipe.recipeName,
            recipeImageFile: recipe.recipeImageFile,
            recipeMemo: recipe.recipeMemo,
            ingredients: newIngredients
        }
        setRecipe(newRecipe)
    }

    const onRecipeNameImageFileMemoChanged = (e: React.ChangeEvent<HTMLInputElement>, type: 'name' | 'imageFile' | 'memo') => {
        if (type) {
            switch (type) {
                case 'name':
                    const name = e.target.value
                    const changeRecipeNameData = { ...recipe, 'recipeName': name }
                    setRecipe(changeRecipeNameData)
                    break
                case 'imageFile':
                    const file = e.target.files?.[0] ? e.target.files?.[0] : null
                    const changeRecipeImageFileData = { ...recipe, recipeImageFile: file }
                    console.log('ここにはでてる？', changeRecipeImageFileData);
                    setRecipe(changeRecipeImageFileData)
                    break
                case 'memo':
                    const memo = e.target.value
                    const changeRecipeMemoData = { ...recipe, recipeMemo: memo }
                    setRecipe(changeRecipeMemoData)
                    break
            }
        }
    }


    const onRecipeUpdateButtonClicked = async () => {
        let newdata
        if (recipe.recipeImageFile) {
            const data = await uploaaRecipeImage(recipe.recipeImageFile)
            newdata = { ...recipe, recipeImageFile: data }
        }

        const recipeDataWithRecipeId = {
            recipeId: getRecipeById,
            recipe: newdata
        }
        // console.log('apiに送るデータ',recipeDataWithRecipeId);

        const response = await fetch('/api/recipeUpdateApi', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            //必要なのは、getRecipeById、ingredientsstate,postRecipeDateilだな
            body: JSON.stringify({ data: recipeDataWithRecipeId })
        })

        const result = await response.json()

        if (result.success) {
            router.push('/')
        } else {
            console.log('エラーが発生');
        }
    }

    return (
        <div className="flex justify-center min-h-screen py-6 text-[#4a4a4a] bg-gray-50">
            <div className="w-11/12 flex flex-col space-y-6">
                <div className="flex gap-6">
                    <UpdateImageFile
                        onRecipeNameImageFileMemoChanged={onRecipeNameImageFileMemoChanged}
                    />
                    <div className="w-1/2 flex flex-col space-y-4">
                        <UpdateName
                            name={recipe.recipeName}
                            onRecipeNameImageFileMemoChanged={onRecipeNameImageFileMemoChanged}
                        />
                        <p className="text-2xl font-bold mt-2">材料</p>
                        <UpdateIngredients
                            ingredients={recipe.ingredients}
                            onIngredienteChanged={onIngredienteChanged}
                            onDeleteIngredientButtonClicked={onDeleteIngredientButtonClicked}
                        />
                        <button
                            onClick={omEmptyIngredientsAddButtonClicked}
                            className="mt-2 px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                        >
                            材料追加
                        </button>
                    </div>
                </div>
                <UpdateMemo memo={recipe.recipeMemo} onRecipeNameImageFileMemoChanged={onRecipeNameImageFileMemoChanged} />
                <UpdateSave onRecipeUpdateButtonClicked={onRecipeUpdateButtonClicked} />
            </div>
        </div>

    )
}

export default Recipe_Creation

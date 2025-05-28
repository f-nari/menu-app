'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { usePathname, useRouter } from 'next/navigation'
import { Ingredients, PostRecipeDateil, } from '@/Types/types'

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

    useEffect(() => {
        const fetchRecipeDeta = async () => {
            const res = await fetch(`/api/getidrecipes?id=${getRecipeById}`)
            const data = await res.json()
            const newIngredients: Ingredients[] = []
            let currentIngredientArrayId = ingredintsArrayId;
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

        }
        fetchRecipeDeta()
    }
        , [getRecipeById])

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
                    const file = e.target.files?.[0]
                    const changeRecipeImageFileData = { ...recipe, recipeImagefile: file }
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
        const recipeDataWithRecipeId = {
            recipeId: getRecipeById,
            recipe: recipe
        }
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

                {/* 上ゾーン：画像とフォーム */}
                <div className="flex gap-6">
                    {/* 画像アップロード */}
                    <div className="w-1/2">
                        <div className="h-80 bg-[#f8f6f1] rounded-md flex items-center justify-center border">
                            <input
                                type="file"
                                onChange={(e) => onRecipeNameImageFileMemoChanged(e, 'imageFile')}
                                className="text-center"
                            />
                        </div>
                    </div>

                    {/* レシピ名 + 材料 */}
                    <div className="w-1/2 flex flex-col space-y-4">
                        <input
                            type="text"
                            defaultValue={recipe.recipeName}
                            placeholder="ハンバーグ"
                            className="text-3xl bg-[#f8f6f1] p-2 rounded-sm"
                            onChange={(e) => onRecipeNameImageFileMemoChanged(e, 'name')}
                        />

                        <p className="text-2xl font-bold mt-2">材料</p>
                        <div className="space-y-2">
                            {recipe.ingredients.map((ingredient) => (
                                <div className="flex items-center gap-2" key={ingredient.id}>
                                    <label className="w-16 text-right">材料名</label>
                                    <input
                                        type="text"
                                        value={ingredient.title}
                                        placeholder="ひき肉"
                                        className="bg-[#f8f6f1] p-1 rounded-sm flex-1"
                                        onChange={(e) => onIngredienteChanged(e, 'title', ingredient.id!)}
                                    />
                                    <label className="w-8 text-right">量</label>
                                    <input
                                        type="text"
                                        value={ingredient.quantity}
                                        placeholder="300"
                                        className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                                        onChange={(e) => onIngredienteChanged(e, 'quantity', ingredient.id!)}
                                    />
                                    <label className="w-10 text-right">単位</label>
                                    <input
                                        type="text"
                                        value={ingredient.unit}
                                        placeholder="g"
                                        className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                                        onChange={(e) => onIngredienteChanged(e, 'unit', ingredient.id!)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => onDeleteIngredientButtonClicked(ingredient.id!)}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={omEmptyIngredientsAddButtonClicked}
                            className="mt-2 px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                        >
                            材料追加
                        </button>
                    </div>
                </div>

                {/* メモゾーン */}
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold mb-2">メモ</h1>
                    <textarea
                        defaultValue={recipe.recipeMemo}
                        placeholder="コツやポイント"
                        className="w-full h-40 bg-[#f8f6f1] p-3 rounded-sm resize-none"
                        onChange={(e) => onRecipeNameImageFileMemoChanged(e, 'memo')}
                    />
                </div>

                {/* 保存ボタン */}
                <div className="text-right">
                    <button
                        type="submit"
                        onClick={onRecipeUpdateButtonClicked}
                        className="px-6 py-2 bg-green-400 text-white rounded hover:bg-green-500"
                    >
                        レシピ保存
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Recipe_Creation

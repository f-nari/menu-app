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
        <div className='flex justify-center  h-screen text-[#4a4a4a]'>
            {/* 詳細ゾーン */}
            <div className='w-11/12 flex flex-col  h-full '>
                {/* 上ゾーン */}
                <div className='flex mt-6' >
                    <div>
                        <input type="file" className='h-80 bg-[#f8f6f1]' onChange={(e) => onRecipeNameImageFileMemoChanged(e, 'imageFile')} />
                    </div>
                    {/*説明ゾーン */}
                    <div className='flex flex-col ml-3 '>
                        <input type='text' defaultValue={recipe.recipeName} className='text-3xl bg-[#f8f6f1] rounded-sm' onChange={(e) => onRecipeNameImageFileMemoChanged(e, 'name')} placeholder='ハンバーグ' />
                        <p className='text-2xl font-bold mt-5 mb-3'>材料</p>
                        {recipe.ingredients.map((ingredient) => (
                            <div className='flex' key={ingredient.id}>
                                <label htmlFor="" className='mr-4'>材料名</label>
                                <input type="text" value={ingredient.title} placeholder='ひき肉' className='bg-[#f8f6f1] rounded-sm' onChange={(e) => (onIngredienteChanged(e, 'title', ingredient.id!))} />
                                <label htmlFor="" className='mr-4 ml-4' >量</label>
                                <input type="text" value={ingredient.quantity} placeholder='300' className='bg-[#f8f6f1] rounded-sm w-20' onChange={(e) => (onIngredienteChanged(e, 'quantity', ingredient.id!))} />
                                <label htmlFor="" className='mr-4 ml-4'>単位</label>
                                <input type="text" value={ingredient.unit} placeholder='g' className='bg-[#f8f6f1] rounded-sm w-20' onChange={(e) => (onIngredienteChanged(e, 'unit', ingredient.id!))} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => onDeleteIngredientButtonClicked(ingredient.id!)} />
                            </div>

                        ))}
                        <button onClick={() => omEmptyIngredientsAddButtonClicked()}>材料追加</button>
                    </div>
                </div>
                {/*下ゾーン memozorn*/}
                <div className='flex flex-col grow mt-5 '>
                    <h1 className='h-6'>memo</h1>
                    <input type="text" defaultValue={recipe.recipeMemo} className='w-full  grow rounded-sm bg-[#f8f6f1] mb-2' onChange={(e) => onRecipeNameImageFileMemoChanged(e, 'memo')} placeholder='コツやポイント' />
                </div>
                <button className='border' type='submit' onClick={() => onRecipeUpdateButtonClicked()} >レシピ保存</button>

            </div>
        </div>
    )
}

export default Recipe_Creation

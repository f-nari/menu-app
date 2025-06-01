'use client'
import { UserContext } from '@/context/UserContext'
import { Ingredients } from '@/Types/types'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import RecipeCreationSave from './Save/RecipeCreationSave'
import RecipeCrationMemo from './Memo/RecipeCrationMemo'
import RecipeCrationName from './Name/RecipeCrationName'

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
            {/* 上ゾーン */}
            <div className="flex gap-6">
                {/* 画像アップロード */}
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

                {/* レシピ入力 */}
                <div className="w-1/2 flex flex-col space-y-4">
                    <RecipeCrationName setRecipeName ={setRecipeName} recipeName={recipeName}/>
                    {/* <input
                        type="text"
                        placeholder="ハンバーグ"
                        className="text-3xl bg-[#f8f6f1] p-2 rounded-sm"
                        onChange={(e) => setRecipeName(e.target.value)}
                    /> */}
                    <input
                        type="text"
                        placeholder={userEmail?.email}
                        className="bg-[#f8f6f1] p-2 rounded-sm"
                    />

                    <p className="text-2xl font-bold mt-2">材料</p>
                    <div className="space-y-2">
                        {ingredients.map((ingredient) => (
                            <div className="flex items-center gap-2" key={ingredient.id}>
                                <label className="w-16 text-right">材料名</label>
                                <input
                                    type="text"
                                    placeholder="ひき肉"
                                    className="bg-[#f8f6f1] p-1 rounded-sm flex-1"
                                    onChange={(e) => onIngredientChanged(e, 'title', ingredient.id!)}
                                />
                                <label className="w-8 text-right">量</label>
                                <input
                                    type="text"
                                    placeholder="300"
                                    className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                                    onChange={(e) => onIngredientChanged(e, 'quantity', ingredient.id!)}
                                />
                                <label className="w-10 text-right">単位</label>
                                <input
                                    type="text"
                                    placeholder="g"
                                    className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                                    onChange={(e) => onIngredientChanged(e, 'unit', ingredient.id!)}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => onIngredientDeleteButtonClicked(ingredient.id!)}
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={onEmptyIngredientAddButtunClicked} className="mt-2 px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                        材料追加
                    </button>
                </div>
            </div>

            {/* メモゾーン */}
            <RecipeCrationMemo setRecipeMemo={setRecipeMemo} />

            {/* 保存ボタン */}
            <RecipeCreationSave ingredients={ingredients} recipeMemo={recipeMemo} recipeName={recipeName} recipeImageFile={recipeImageFile} />
        </div>
    )
}

export default RecipeCreationComponents
'use client'

import React, { useContext, useState } from 'react'
import { recipe_save } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/context/UserContext'

export type Ingredients = {
  id?: number
  title?: string;
  quantity?: number;
  unit?: string
}

const Recipe_Creation = () => {
  const [ingredientsstate, setIngredientstate] = useState<Ingredients[]>([{ id: 1, title: '', quantity: 0, unit: '' }])
  const [memo, setMemo] = useState('')
  const [idCounter, setIdCounter] = useState(2)
  const [recipename, setRecipeName] = useState('')
  const [recipeImageFile, setRecipeImageFile] = useState<File | undefined>(undefined)
  const router = useRouter()
  const userEmail = useContext(UserContext)

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>, genre: 'title' | 'quantity' | 'unit', id: number) => {
    const data = [...ingredientsstate]
    //title,unitならstringのため、そのままで良いが、quantityだった場合、numberである必要があるため、eを変換しなければならない
    const changeData = genre === 'quantity' ? Number(e.target.value) : e.target.value
    const newData = data.map(data =>
      data.id === id ? { ...data, [genre]: changeData } : data
    )
    setIngredientstate(newData)
  }

  const addClickHandler = () => {
    const update = [...ingredientsstate, { id: idCounter, title: '', quantity: 0, unit: '' }]
    setIdCounter(idCounter => idCounter += 1)
    setIngredientstate(update)
  }

  const deleteClickHandler = (id: number) => {
    const ingredientsList = [...ingredientsstate]
    const idDeleteIngredientsList = ingredientsList.filter(item => item.id !== id)
    setIngredientstate(idDeleteIngredientsList)
  }

  const recipeSaveClick = async () => {
    const res = await recipe_save({ ingredientsstate, memo, recipename, recipeImageFile })

    if (res === 'ok') {
      router.push('/')
    }


  }

  return (
    <div className="flex justify-center min-h-screen text-[#4a4a4a]  py-6">
      <div className="w-11/12 flex flex-col space-y-6  overflow-auto ">
        {/* 上ゾーン */}
        <div className="flex gap-6">
          {/* 画像アップロード */}
          <div className="w-1/2">
            <div className="h-80 bg-[#f8f6f1] rounded-md flex items-center justify-center">
              <input
                type="file"
                onChange={(e) => setRecipeImageFile(e.target.files?.[0])}
                className="text-center"
              />
            </div>
          </div>

          {/* レシピ入力 */}
          <div className="w-1/2 flex flex-col space-y-4">
            <input
              type="text"
              placeholder="ハンバーグ"
              className="text-3xl bg-[#f8f6f1] p-2 rounded-sm"
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <input
              type="text"
              placeholder={userEmail?.email}
              className="bg-[#f8f6f1] p-2 rounded-sm"
            />

            <p className="text-2xl font-bold mt-2">材料</p>
            <div className="space-y-2">
              {ingredientsstate.map((ingredient) => (
                <div className="flex items-center gap-2" key={ingredient.id}>
                  <label className="w-16 text-right">材料名</label>
                  <input
                    type="text"
                    placeholder="ひき肉"
                    className="bg-[#f8f6f1] p-1 rounded-sm flex-1"
                    onChange={(e) => changeEvent(e, 'title', ingredient.id!)}
                  />
                  <label className="w-8 text-right">量</label>
                  <input
                    type="text"
                    placeholder="300"
                    className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                    onChange={(e) => changeEvent(e, 'quantity', ingredient.id!)}
                  />
                  <label className="w-10 text-right">単位</label>
                  <input
                    type="text"
                    placeholder="g"
                    className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                    onChange={(e) => changeEvent(e, 'unit', ingredient.id!)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteClickHandler(ingredient.id!)}
                  />
                </div>
              ))}
            </div>
            <button onClick={addClickHandler} className="mt-2 px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
              材料追加
            </button>
          </div>
        </div>

        {/* メモゾーン */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold mb-2">メモ</h1>
          <textarea
            placeholder="コツやポイント"
            className="w-full h-40 bg-[#f8f6f1] p-3 rounded-sm resize-none "
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        {/* 保存ボタン */}
        <div className="text-right">
          <button
            type="submit"
            onClick={recipeSaveClick}
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

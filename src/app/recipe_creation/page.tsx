'use client'

import React, { useState } from 'react'
import { recipe_save } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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



  return (
    <div className='flex justify-center  h-screen text-[#4a4a4a]'>
      {/* 詳細ゾーン */}
      <div className='w-11/12 flex flex-col  h-full '>
        {/* 上ゾーン */}
        <div className='flex mt-6' >
          <div>
            {/* <Image src={} height={500} width={500} alt='' className='rounded-2xl shadow-xl'></Image> */}
            <input type="file" className='h-80 bg-[#f8f6f1]' onChange={(e) => setRecipeImageFile(e.target.files?.[0])} />
          </div>
          {/*説明ゾーン */}
          <div className='flex flex-col ml-3 '>
            <input type='text' className='text-3xl bg-[#f8f6f1] rounded-sm' onChange={(e) => setRecipeName(e.target.value)} placeholder='ハンバーグ' />
            <input type="text" placeholder='廣川郁也' />
            <p className='text-2xl font-bold mt-5 mb-3'>材料</p>
            {ingredientsstate.map((ingredient,) => (
              <div className='flex' key={ingredient.id}>
                <label htmlFor="" className='mr-4'>材料名</label>
                <input type="text" placeholder='ひき肉' className='bg-[#f8f6f1] rounded-sm' onChange={(e) => (changeEvent(e, 'title', ingredient.id!))} />
                <label htmlFor="" className='mr-4 ml-4' >量</label>
                <input type="text" placeholder='300' className='bg-[#f8f6f1] rounded-sm w-20' onChange={(e) => (changeEvent(e, 'quantity', ingredient.id!))} />
                <label htmlFor="" className='mr-4 ml-4'>単位</label>
                <input type="text" placeholder='g' className='bg-[#f8f6f1] rounded-sm w-20' onChange={(e) => (changeEvent(e, 'unit', ingredient.id!))} />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteClickHandler(ingredient.id!)} />
              </div>

            ))}
            <button onClick={() => addClickHandler()}>材料追加</button>
          </div>
        </div>
        {/*下ゾーン memozorn*/}
        <div className='flex flex-col grow mt-5 '>
          <h1 className='h-6'>memo</h1>
          <input type="text" className='w-full  grow rounded-sm bg-[#f8f6f1] mb-2' onChange={(e) => setMemo(e.target.value)} placeholder='コツやポイント' />
        </div>
        <button className='border' type='submit' onClick={() => recipe_save({ ingredientsstate, memo, recipename, recipeImageFile })} >レシピ保存</button>

      </div>
    </div>
  )
}

export default Recipe_Creation

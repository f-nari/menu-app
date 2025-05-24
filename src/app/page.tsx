'use client'

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from 'react'
import RecipeCards from "@/components/Recipes/RecipeCards";
import { IngredientsType, MenuItemsType, RecipeType } from "@/Types/types";
import SumIngredients from "@/components/SumIngredients/SumIngredients";

export default function Home() {

  const [recipeLists, setRecipeLists] = useState<RecipeType[]>([])
  const [menuLists, setMenuLists] = useState<MenuItemsType[]>([{
    date: new Date,
    meal: {
      breakfast: '',
      lunch: '',
      dinner: '',
    }
  }])
  const [sumIngredientsList, setSumIngredientsList] = useState<IngredientsType[]>([])
  const [singleIngredient, setSingleIngredient] = useState<IngredientsType[]>([{ id: 0, ingredientName: '', ingredientQuantity: 0, ingredientUnit: '' }])
  const [count, setCount] = useState(1)

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch('/api/allgetrecipes')
      const data = await res.json()
      setRecipeLists(data)
    }
    fetchRecipes()
  }, [])

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, mealTime: string, propsindex: number) => {

    const changeMenuList = menuLists.map((menuList, index) => {
      if (index === propsindex) {
        const newMeal = { ...menuList.meal }
        let newDate = menuList.date

        switch (mealTime) {
          case 'date':
            newDate = new Date(e.target.value)
            break
          case 'breakfast':
            newMeal.breakfast = e.target.value;
            break;
          case 'lunch':
            newMeal.lunch = e.target.value;
            break;
          case 'dinner':
            newMeal.dinner = e.target.value;
            break;
        }
        return {
          ...menuList,
          date: newDate,
          meal: newMeal
        }
      }

      return menuList
    })

    setMenuLists(changeMenuList)
  }

  const addNewMenuHandler = () => {
    const update = [...menuLists, {
      date: new Date,
      meal: {
        breakfast: '',
        lunch: '',
        dinner: '',
      }
    }]
    setMenuLists(update)
  }

  const getIngredientsHandler = async () => {

    const recipeNumbers = menuLists.map((menuList) => {
      return menuList.meal
    })

    const testnumber = recipeNumbers.map((recipeNumber) => {
      return [recipeNumber.breakfast, recipeNumber.lunch, recipeNumber.dinner]
    })

    const testnumber2 = testnumber.flat().filter(Boolean)

    const res = await fetch(`/api/getingredients`, {
      method: 'POST',
      //headerは、これから送るデータの内容を伝える。Content-Typeは、そういうもの。application/jsonは、アプリケーションのデータ。その中のJSONフォーマットのデータ
      headers: { 'Content-Type': 'application/json' },
      //bodyは実際に送るデータの中身のこと。以下は、JacaScriptのJsonの関数のstringifyを使って、オブジェクトをJson形式に変えるもの。{ids:配列}という形で送る。
      //受け取る側は、  const { ids } = await req.json() 結果→ ids は ['55', '43', '12']で受け取れる
      body: JSON.stringify({ ids: testnumber2 })
    })

    const resIngredientsList = await res.json()

    const ingredientsList = resIngredientsList.map((res) => {
      return res.data
    })

    const ingredients = ingredientsList.map((ingredient) => {
      const returnData: IngredientsType[] = []
      for (let i = 0; i < ingredient.length; i++) {
        const addData = { 'ingredientName': ingredient[i].title, 'ingredientQuantity': ingredient[i].quantity, 'ingredientUnit': ingredient[i].unit }
        returnData.push(addData)
      }
      return returnData

    }).flat()

    const sumIngredints = new Map<string, IngredientsType>

    ingredients.forEach(i => {
      const key = `${i.ingredientName}_${i.IngredientUnit}`
      if (!sumIngredints.has(key)) {
        sumIngredints.set(key, {
          ingredientName: i.ingredientName,
          ingredientQuantity: i.ingredientQuantity,
          ingredientUnit: i.IngredientUnit
        })
      } else {
        sumIngredints.get(key)!.ingredientQuantity += i.ingredientQuantity
      }

      return sumIngredints
    });

    const newList: IngredientsType[] = [...sumIngredientsList]

    for (const [index, value] of sumIngredints) {
      newList.push(value)
    }
    const list = [...newList, ...singleIngredient]

    setSumIngredientsList(list)
  }

  const addSingleIngredient = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    singleIngredient.forEach((s) => {
      if (s.id === id) {
        const singleIngredientData = [...singleIngredient]
        singleIngredientData[id].ingredientName = e.target.value
        setSingleIngredient(singleIngredientData)
      }
    })
  }

  const newSingleIngredient = () => {
    const update = [...singleIngredient, {
      id: count,
      ingredientName: '',
      ingredientQuantity: 0,
      ingredientUnit: '',
    }]

    console.log('listの中身　チェック', update);

    setSingleIngredient(update)
    setCount(count => count += 1)

  }

  return (
    <div className="w-full flex justify-center overflow-auto">
      <div className="w-11/12 flex flex-col text-center mt-6">
        {/* タイトル */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">献立作成</h1>
        </div>

        {/* 献立作成ゾーン */}
        <div className="flex flex-wrap gap-4 justify-center">
          {menuLists.map((menuList, index) => (
            <div className="border rounded-lg p-4 w-72 bg-gray-50 shadow" key={index}>
              <input
                type="date"
                value={menuList.date.toISOString().split('T')[0]}
                onChange={(e) => changeHandler(e, 'date', index)}
                className="w-full mb-3 border px-2 py-1"
              />
              {['breakfast', 'lunch', 'dinner'].map((meal, i) => (
                <div className="flex items-center mt-2" key={i}>
                  <label className="w-10">{meal === 'breakfast' ? '朝' : meal === 'lunch' ? '昼' : '夜'}</label>
                  <select
                    className="ml-2 border w-full h-10 px-2"
                    onChange={(e) => changeHandler(e, meal, index)}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>ーーー</option>
                    {recipeLists.map((recipeList) => (
                      <option value={recipeList.id} key={recipeList.id}>{recipeList.name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={addNewMenuHandler}
            className="h-12 px-4 rounded bg-green-200 hover:bg-green-300 text-sm mt-4"
          >
            献立を追加
          </button>
        </div>

        {/* 材料追加 */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {singleIngredient.map((ingredent) => (
            <input
              key={ingredent.id}
              type="text"
              placeholder="マヨネーズ１本"
              className="border h-10 px-2 rounded w-64"
              onChange={(e) => addSingleIngredient(e, ingredent.id)}
            />
          ))}
          <button onClick={newSingleIngredient} className="px-4 h-10 bg-blue-100 rounded hover:bg-blue-200">追加</button>
          <button
            className="w-32 h-10 bg-amber-100 text-amber-400 font-bold rounded hover:text-black"
            onClick={getIngredientsHandler}
          >
            材料確定
          </button>
        </div>

        {/* 材料表示 */}
        <div className="mt-6">
          <SumIngredients sumIngredientsList={sumIngredientsList} />
        </div>

        {/* レシピゾーン */}
        <h2 className="text-2xl mt-10 mb-4 font-semibold">レシピ一覧</h2>
        <RecipeCards recipeLists={recipeLists} />
      </div>
    </div>

  );
}

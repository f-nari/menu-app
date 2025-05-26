'use client'

import React, { useEffect, useState } from 'react'
import RecipeCards from "@/components/Recipes/RecipeCards";
import { Ingredients, MenuItemsType, RecipeType } from "@/Types/types";
import TotalIngredients from '@/components/TotalIngredients/TotalIngredients';

export default function Home() {

  const [recipes, setRecipes] = useState<RecipeType[]>([])
  const [menuSchedule, setMenuSchedule] = useState<MenuItemsType[]>([{
    date: new Date,
    meal: {
      breakfast: '',
      lunch: '',
      dinner: '',
    }
  }])
  const [totalIngredients, setTotalIngredients] = useState<Ingredients[]>([])
  const [singleIngredient, setSingleIngredient] = useState<Ingredients[]>([{
    id: 0, title: '', quantity: 0, unit: ''
  }])
  const [singleIngredientArrayId, setSingleIngredientArrayId] = useState(1)

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch('/api/allgetrecipes')
      const data = await res.json()
      setRecipes(data)
    }
    fetchRecipes()
  }, [])

  const onMenuScheduleChanged = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, mealTime: string, propsindex: number) => {
    const changeMenuList = menuSchedule.map((menuList, index) => {
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

    setMenuSchedule(changeMenuList)
  }

  const onEmptyMenuAddButtonClicke = () => {
    const update = [...menuSchedule, {
      date: new Date,
      meal: {
        breakfast: '',
        lunch: '',
        dinner: '',
      }
    }]
    setMenuSchedule(update)
  }

  const getIngredientsHandler = async () => {

    const recipeNumbers = menuSchedule.map((menuList) => {
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
      const returnData: Ingredients[] = []
      for (let i = 0; i < ingredient.length; i++) {
        const addData = { 'title': ingredient[i].title, 'quantity': ingredient[i].quantity, 'unit': ingredient[i].unit }
        returnData.push(addData)
      }
      return returnData

    }).flat()

    const sumIngredints = new Map<string, Ingredients>

    ingredients.forEach(i => {
      const key = `${i.ingredientName}_${i.IngredientUnit}`
      if (!sumIngredints.has(key)) {
        sumIngredints.set(key, {
          title: i.ingredientName,
          quantity: i.ingredientQuantity,
          unit: i.IngredientUnit
        })
      } else {
        sumIngredints.get(key)!.quantity += i.ingredientQuantity
      }


      return sumIngredints
    });

    const newList: Ingredients[] = [...totalIngredients]

    for (const [index, value] of sumIngredints) {
      newList.push(value)
    }
    const list = [...newList, ...singleIngredient]

    setTotalIngredients(list)
  }

  const onSingleIngredientChanged = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    singleIngredient.forEach((s) => {
      if (s.id === id) {
        const singleIngredientData = [...singleIngredient]
        singleIngredientData[id].title = e.target.value
        setSingleIngredient(singleIngredientData)
      }
    })
  }

  const onAddNewSingleIngredientButtonClicked = () => {
    const update = [...singleIngredient, {
      id: singleIngredientArrayId,
      ingredientName: '',
      ingredientQuantity: 0,
      ingredientUnit: '',
    }]

    setSingleIngredient(update)
    setSingleIngredientArrayId(singleIngredientArrayId => singleIngredientArrayId += 1)

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
          {menuSchedule.map((menuList, index) => (
            <div className="border rounded-lg p-4 w-72 bg-gray-50 shadow" key={index}>
              <input
                type="date"
                value={menuList.date.toISOString().split('T')[0]}
                onChange={(e) => onMenuScheduleChanged(e, 'date', index)}
                className="w-full mb-3 border px-2 py-1"
              />
              {['breakfast', 'lunch', 'dinner'].map((meal, i) => (
                <div className="flex items-center mt-2" key={i}>
                  <label className="w-10">{meal === 'breakfast' ? '朝' : meal === 'lunch' ? '昼' : '夜'}</label>
                  <select
                    className="ml-2 border w-full h-10 px-2"
                    onChange={(e) => onMenuScheduleChanged(e, meal, index)}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>ーーー</option>
                    {recipes.map((recipeList) => (
                      <option value={recipeList.id} key={recipeList.id}>{recipeList.name}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={onEmptyMenuAddButtonClicke}
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
              onChange={(e) => onSingleIngredientChanged(e, ingredent.id)}
            />
          ))}
          <button onClick={onAddNewSingleIngredientButtonClicked} className="px-4 h-10 bg-blue-100 rounded hover:bg-blue-200">追加</button>
          <button
            className="w-32 h-10 bg-amber-100 text-amber-400 font-bold rounded hover:text-black"
            onClick={getIngredientsHandler}
          >
            材料確定
          </button>
        </div>

        {/* 材料表示 */}
        <div className="mt-6">
          <TotalIngredients totalIngredients={totalIngredients} />
        </div>

        {/* レシピゾーン */}
        <h2 className="text-2xl mt-10 mb-4 font-semibold">レシピ一覧</h2>
        <RecipeCards recipes={recipes} />
      </div>
    </div>

  );
}

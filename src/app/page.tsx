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

  const signOut = async () => {
    console.log('ログアウト処理をします');
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log('ｋろえがユーザーです', user);
    const { error } = await supabase.auth.signOut()
  }


  return (
    <div className="w-full flex justify-center h-full">

      {/* <form action={() => signOut()}>
        <button type="submit" >ログアウト</button>
      </form> */}

      <div className="w-11/12 flex flex-col  text-center mt-6 ">
        {/* タイトルゾーン */}
        <div className=" flex justify-center flex-col ">
          <h1 className="text-3xl ">献立作成</h1>
        </div>

        {/* ここから献立作成 */}
        <div className="h-60 flex  text-center ">
          {menuLists.map((menuList, index) => (
            <div className="w-50" key={index}>
              <input type="date" value={menuList.date.toISOString().split('T')[0]} onChange={(e) => changeHandler(e, 'date', index)} />
              <div className="flex mt-3">
                <label htmlFor="">朝</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12" onChange={(e) => changeHandler(e, 'breakfast', index)}>
                  <option value="/" selected hidden>ーーー</option>
                  {recipeLists.map((recipeList) => (
                    <>
                      <option value="" selected hidden>ーーー</option>
                      <option value={recipeList.id}>{recipeList.name}</option>
                    </>
                  ))}
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">昼</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12" onChange={(e) => changeHandler(e, 'lunch', index)}>
                  {recipeLists.map((recipeList) => (
                    <>
                      <option value="" selected hidden>ーーー</option>
                      <option value={recipeList.id}>{recipeList.name}</option>
                    </>
                  ))}
                </select>
              </div>
              <div className="flex mt-2">
                <label htmlFor="">夜</label>
                <select name="" id="" className="ml-4 border-2 w-50 h-12" onChange={(e) => changeHandler(e, 'dinner', index)}>
                  {recipeLists.map((recipeList) => (
                    <>
                      <option value="" selected hidden>ーーー</option>
                      <option value={recipeList.id}>{recipeList.name}</option>
                    </>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <button onClick={() => addNewMenuHandler()}>追加</button>
        </div>

        {/* 材料集計ボタン と　材料シングル追加ボタン");
        */}
        <div className="flex justify-around" >
          {singleIngredient.map((ingredent) => (
            <div key={ingredent.id}>
              <input type="text" placeholder="マヨネーズ１本" className="border h-5" onChange={(e) => addSingleIngredient(e, ingredent.id)} />
            </div>
          ))}
          <button onClick={() => newSingleIngredient()}>追加</button>

          <button className='w-20 h-10 rounded-sm bg-amber-100 font-bold text-amber-400 hover:text-black mb-5' onClick={() => getIngredientsHandler()} >材料確定</button>
        </div>

        {/* 材料表示箇所 */}
        <SumIngredients sumIngredientsList={sumIngredientsList} />

        {/* レシピゾーン */}
        <h2 className='text-2xl mb-4'>レシピ一覧</h2>
        <RecipeCards recipeLists={recipeLists} />

      </div>

    </div>
  );
}

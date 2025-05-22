'use client'

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { log } from "util";
import RecipeCards from "@/components/Recipes/RecipeCards";
import { IngredientsType, MenuItemsType, RecipeType } from "@/Types/types";

// export type RecipeType = {
//   id: string
//   created_at: string,
//   name: string,
//   memo: string,
//   signedUrl: string
//   ingredientsDataList: [{
//     ingredientName: string, quantity: number, unit: string
//   }]
// }

// export type MenuItemsType = {
//   date: Date,
//   meal: {
//     breakfast: string,
//     lunch: string,
//     dinner: string
//   }
// }

//export type IngredientsType = {
//   id?: number
//   ingredientName: string,
//   ingredientQuantity: number,
//   ingredientUnit: string
// }

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
      // [{…}, {…}]
      // const strArray = ingredient.length
      //2を取得
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

    // console.log('合計金額出るはず', sumIngredints);

    const newList: IngredientsType[] = [...sumIngredientsList]

    for (const [index, value] of sumIngredints) {
      newList.push(value)
    }
    //singleIngredientをnewListに追加したい。
    const list = [...newList, ...singleIngredient]

    setSumIngredientsList(list)
  }

  //以下は、シングルの入力欄が変更されたら、動く関数なので、シングルのデータが、まとめられるように、作る。最終的なゴールは、
  //setSumIngredientsListにこのシングルをぶつけること。onclickしたときにつながるように作る、

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
        <div className='w-full mt-4 p-4 bg-gray-100 rounded-lg'>
          {sumIngredientsList.length > 0 ?
            sumIngredientsList.map((s, index) => (
              <ul className="list-disc pl-5 text-left" key={index}>
                <li>{s.ingredientName}:{s.ingredientQuantity}{s.ingredientUnit}</li>
              </ul>
            )) : <p>献立が登録されていません</p>}
        </div>



        {/* レシピゾーン */}
        <h2 className='text-2xl mb-4'>レシピ一覧</h2>
        <RecipeCards recipeLists={recipeLists} />
        {/* <div className="w-full grid grid-cols-5 gap-4">
          {recipeLists.map((recipeData) => (
            <div className=" w-50 h-60 shadow-md rounded-2xl mr-5" key={recipeData.id}>
              <div className="w-full  h-40 rounded-t-lg">
                {recipeData.signedUrl ?
                  <Image src={recipeData.signedUrl} width={500} height={500} alt="" className="rounded-t-lg"></Image>
                  :
                  <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-t-lg">
                    <span className="text-gray-600">画像がありません</span>
                  </div>
                }

              </div>
              <div>{recipeData.name}</div>
              <Link href={`/recipe/${recipeData.id}`}>詳細へ</Link>
            </div>
          ))}
        </div> */}
      </div>

    </div>
  );
}

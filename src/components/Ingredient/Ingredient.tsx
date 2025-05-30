'use client'

import { Ingredients, MenuItemsType } from '@/Types/types'
import React, { useState } from 'react'
import CalculateIngredient from './CalculateIngredient/CalculateIngredient'

type Props = {
    menuSchedule: MenuItemsType[]
}

export const Ingredient = ({ menuSchedule }: Props) => {
    const [singleIngredient, setSingleIngredient] = useState<Ingredients[]>([{
        id: 0, title: '', quantity: 0, unit: ''
    }])
    const [singleIngredientArrayId, setSingleIngredientArrayId] = useState(1)
    // const [totalIngredients, setTotalIngredients] = useState<Ingredients[]>([])

    const onSingleIngredientChanged = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        singleIngredient.forEach((s) => {
            if (s.id === id) {
                const singleIngredientData = [...singleIngredient]
                singleIngredientData[id].title = e.target.value
                setSingleIngredient(singleIngredientData)
            }
        })
    }

    const onEmptySingleIngredientAddButtonClicked = () => {
        const update: Ingredients[] = [...singleIngredient, {
            id: singleIngredientArrayId,
            title: '',
            quantity: 0,
            unit: '',
        }]

        setSingleIngredient(update)
        setSingleIngredientArrayId(singleIngredientArrayId => singleIngredientArrayId += 1)

    }

    // const calculateIngredientTotal = async () => {

    //     const menuRecipeNumberObjectArray = menuSchedule.map((menuList) => {
    //         return menuList.meal
    //     })

    //     const manuRecipeNumbersArray = menuRecipeNumberObjectArray.map((recipeNumber) => {
    //         return [recipeNumber.breakfast, recipeNumber.lunch, recipeNumber.dinner]
    //     })

    //     const flatMenuRecipeNumbers = manuRecipeNumbersArray.flat().filter(Boolean)

    //     const res = await fetch(`/api/getingredients`, {
    //         method: 'POST',
    //         //headerは、これから送るデータの内容を伝える。Content-Typeは、そういうもの。application/jsonは、アプリケーションのデータ。その中のJSONフォーマットのデータ
    //         headers: { 'Content-Type': 'application/json' },
    //         //bodyは実際に送るデータの中身のこと。以下は、JacaScriptのJsonの関数のstringifyを使って、オブジェクトをJson形式に変えるもの。{ids:配列}という形で送る。
    //         //受け取る側は、  const { ids } = await req.json() 結果→ ids は ['55', '43', '12']で受け取れる
    //         body: JSON.stringify({ ids: flatMenuRecipeNumbers })
    //     })

    //     const resIngredientsList = await res.json()

    //     //APIのレスポンスの型定義をあとで行う
    //     const ingredientsList: Ingredients[][] = resIngredientsList.map((res) => {
    //         return res.data
    //     })

    //     const ingredients: Ingredients[] = ingredientsList.map((ingredient) => {
    //         const returnData: Ingredients[] = []
    //         for (let i = 0; i < ingredient.length; i++) {
    //             const addData = { 'id': i, 'title': ingredient[i].title, 'quantity': ingredient[i].quantity, 'unit': ingredient[i].unit }
    //             returnData.push(addData)
    //         }
    //         return returnData
    //     }).flat()

    //     const sumIngredints = new Map<string, Ingredients>

    //     ingredients.forEach((i, index: number) => {
    //         const key = `${i.title}_${i.unit}`
    //         if (!sumIngredints.has(key)) {
    //             sumIngredints.set(key, {
    //                 id: index,
    //                 title: i.title,
    //                 quantity: i.quantity,
    //                 unit: i.unit
    //             })
    //         } else {
    //             sumIngredints.get(key)!.quantity += i.quantity
    //         }


    //         return sumIngredints
    //     });

    //     const newIngredientsList: Ingredients[] = [...totalIngredients]

    //     for (const [, value] of sumIngredints) {
    //         newIngredientsList.push(value)
    //     }
    //     const list = [...newIngredientsList, ...singleIngredient]
    //     setTotalIngredients(list)
    // }


    return (
        <div>
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
                <button onClick={onEmptySingleIngredientAddButtonClicked} className="px-4 h-10 bg-blue-100 rounded hover:bg-blue-200">追加</button>
                <CalculateIngredient menuSchedule={menuSchedule} singleIngredient={singleIngredient} />
                {/* <button
                    className="w-32 h-10 bg-amber-100 text-amber-400 font-bold rounded hover:text-black"
                    onClick={calculateIngredientTotal}
                >
                    材料確定
                </button> */}
            </div>
            {/* <div className="mt-6">
                <TotalIngredients totalIngredients={totalIngredients} />
            </div> */}
        </div>
    )
}

export default Ingredient
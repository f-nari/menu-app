import { IngredientsTotal } from '@/components/Ingredient/CalculateIngredient/IngredientsTotal/IngredientsTotal'
import { Ingredients, MenuItemsType } from '@/Types/types'
import React, { useState } from 'react'

type Props = {
    menuSchedule: MenuItemsType[],
    singleIngredient: Ingredients[]
}

export const CalculateIngredient = ({ menuSchedule, singleIngredient }: Props) => {
    const [totalIngredients, setTotalIngredients] = useState<Ingredients[]>([])

    const calculateIngredientTotal = async () => {

        const menuRecipeNumberObjectArray = menuSchedule.map((menuList) => {
            return menuList.meal
        })

        const manuRecipeNumbersArray = menuRecipeNumberObjectArray.map((recipeNumber) => {
            return [recipeNumber.breakfast, recipeNumber.lunch, recipeNumber.dinner]
        })

        const flatMenuRecipeNumbers = manuRecipeNumbersArray.flat().filter(Boolean)

        const res = await fetch(`/api/getingredients`, {
            method: 'POST',
            //headerは、これから送るデータの内容を伝える。Content-Typeは、そういうもの。application/jsonは、アプリケーションのデータ。その中のJSONフォーマットのデータ
            headers: { 'Content-Type': 'application/json' },
            //bodyは実際に送るデータの中身のこと。以下は、JacaScriptのJsonの関数のstringifyを使って、オブジェクトをJson形式に変えるもの。{ids:配列}という形で送る。
            //受け取る側は、  const { ids } = await req.json() 結果→ ids は ['55', '43', '12']で受け取れる
            body: JSON.stringify({ ids: flatMenuRecipeNumbers })
        })

        const resIngredientsList = await res.json()

        //APIのレスポンスの型定義をあとで行う
        const ingredientsList: Ingredients[][] = resIngredientsList.map((res) => {
            return res.data
        })

        const ingredients: Ingredients[] = ingredientsList.map((ingredient) => {
            const returnData: Ingredients[] = []
            for (let i = 0; i < ingredient.length; i++) {
                const addData = { 'id': i, 'title': ingredient[i].title, 'quantity': ingredient[i].quantity, 'unit': ingredient[i].unit }
                returnData.push(addData)
            }
            return returnData
        }).flat()

        const sumIngredints = new Map<string, Ingredients>

        ingredients.forEach((i, index: number) => {
            const key = `${i.title}_${i.unit}`
            if (!sumIngredints.has(key)) {
                sumIngredints.set(key, {
                    id: index,
                    title: i.title,
                    quantity: i.quantity,
                    unit: i.unit
                })
            } else {
                sumIngredints.get(key)!.quantity += i.quantity
            }


            return sumIngredints
        });

        const newIngredientsList: Ingredients[] = [...totalIngredients]

        for (const [, value] of sumIngredints) {
            newIngredientsList.push(value)
        }
        const list = [...newIngredientsList, ...singleIngredient]
        setTotalIngredients(list)
    }
    return (
        <div className='mt-5'>
            <div>
                <button
                    className="w-32 h-10 bg-amber-100 text-amber-400 font-bold rounded hover:text-black"
                    onClick={calculateIngredientTotal}
                >
                    材料計算
                </button>
            </div>
            {totalIngredients.length > 0 ? <IngredientsTotal totalIngredients={totalIngredients} /> : <></>}
        </div>
    )
}

export default CalculateIngredient
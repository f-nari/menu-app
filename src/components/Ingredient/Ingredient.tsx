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
                <button onClick={onEmptySingleIngredientAddButtonClicked} className="px-4 h-10 bg-blue-100 rounded hover:bg-blue-200">単品材料追加</button>
            </div>
            <CalculateIngredient menuSchedule={menuSchedule} singleIngredient={singleIngredient} />
        </div>
    )
}

export default Ingredient
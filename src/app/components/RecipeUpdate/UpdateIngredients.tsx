'use client'

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
    ingredients:{id: number, title: string, quantity: number, unit: string}[],
    onIngredienteChanged:(e: React.ChangeEvent<HTMLInputElement>, genre: 'title' | 'quantity' | 'unit', id: number) => void,
    onDeleteIngredientButtonClicked:(id: number) => void

}

export const UpdateIngredients = ({ingredients,onIngredienteChanged,onDeleteIngredientButtonClicked}:Props) => {
    return (
        <div className="space-y-2">
            {ingredients.map((ingredient) => (
                <div className="flex items-center gap-2" key={ingredient.id}>
                    <label className="w-16 text-right">材料名</label>
                    <input
                        type="text"
                        value={ingredient.title}
                        placeholder="ひき肉"
                        className="bg-[#f8f6f1] p-1 rounded-sm flex-1"
                        onChange={(e) => onIngredienteChanged(e, 'title', ingredient.id!)}
                    />
                    <label className="w-8 text-right">量</label>
                    <input
                        type="number"
                        value={ingredient.quantity}
                        placeholder="300"
                        className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                        onChange={(e) => onIngredienteChanged(e, 'quantity', ingredient.id!)}
                    />
                    <label className="w-10 text-right">単位</label>
                    <input
                        type="text"
                        value={ingredient.unit}
                        placeholder="g"
                        className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                        onChange={(e) => onIngredienteChanged(e, 'unit', ingredient.id!)}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 cursor-pointer"
                        onClick={() => onDeleteIngredientButtonClicked(ingredient.id!)}
                    />
                </div>
            ))}
        </div>
    )
}

export default UpdateIngredients
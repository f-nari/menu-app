'use cli'

import { Ingredients } from '@/Types/types'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
    ingredients: Ingredients[],
    onIngredientChanged: (e: React.ChangeEvent<HTMLInputElement>, genre:  'title' | 'quantity' | 'unit', id: number) => void,
    onIngredientDeleteButtonClicked :(id:number) => void
}

export const RecipeCreationIngredients = ({ingredients,onIngredientChanged,onIngredientDeleteButtonClicked}:Props) => {
    return (
        <div className="space-y-2">
            {ingredients.map((ingredient) => (
                <div className="flex items-center gap-2" key={ingredient.id}>
                    <label className="w-16 text-right">材料名</label>
                    <input
                        type="text"
                        placeholder="ひき肉"
                        className="bg-[#f8f6f1] p-1 rounded-sm flex-1"
                        onChange={(e) => onIngredientChanged(e, 'title', ingredient.id!)}
                    />
                    <label className="w-8 text-right">量</label>
                    <input
                        type="text"
                        placeholder="300"
                        className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                        onChange={(e) => onIngredientChanged(e, 'quantity', ingredient.id!)}
                    />
                    <label className="w-10 text-right">単位</label>
                    <input
                        type="text"
                        placeholder="g"
                        className="bg-[#f8f6f1] p-1 rounded-sm w-20"
                        onChange={(e) => onIngredientChanged(e, 'unit', ingredient.id!)}
                    />
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 cursor-pointer"
                        onClick={() => onIngredientDeleteButtonClicked(ingredient.id!)}
                    />
                </div>
            ))}
        </div>
    )
}

export default RecipeCreationIngredients
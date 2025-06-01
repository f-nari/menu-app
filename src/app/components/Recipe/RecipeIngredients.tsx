'use client'
import { Ingredients } from '@/Types/types'
import React from 'react'

type Props = {
    ingredients: Ingredients[] | undefined
}

export const RecipeIngredients = ({ ingredients }: Props) => {
    return (
        <table className="table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border px-4 py-2">食材名</th>
                    <th className="border px-4 py-2">量</th>
                    <th className="border px-4 py-2">単位</th>
                </tr>
            </thead>
            <tbody>
                {ingredients ? ingredients.map((ingredient, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{ingredient.title}</td>
                        <td className="border px-4 py-2">{ingredient.quantity}</td>
                        <td className="border px-4 py-2">{ingredient.unit}</td>
                    </tr>
                )) : <tr><td>材料がありません</td></tr>}
            </tbody>
        </table>
    )
}

export default RecipeIngredients
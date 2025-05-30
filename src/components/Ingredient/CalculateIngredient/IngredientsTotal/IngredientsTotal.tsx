import { Ingredients } from '@/Types/types'
import React from 'react'

type Props = {
    totalIngredients:Ingredients[]
}

export const IngredientsTotal = ({totalIngredients}:Props) => {
    return (
        <div className="w-full mt-4 p-4 bg-gray-100 rounded-lg shadow">
            {totalIngredients.length > 0 ? (
                <ul className="list-disc pl-6 space-y-1 text-left text-gray-700">
                    {totalIngredients.map((t, index) => (
                        <li key={index}>
                            {t.title}：{t.quantity}{t.unit}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">献立が登録されていません</p>
            )}
        </div>

    )
}

export default IngredientsTotal
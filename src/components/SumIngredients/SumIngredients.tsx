import React from 'react'

const SumIngredients = ({ sumIngredientsList }) => {
    return (
        <div className="w-full mt-4 p-4 bg-gray-100 rounded-lg shadow">
            {sumIngredientsList.length > 0 ? (
                <ul className="list-disc pl-6 space-y-1 text-left text-gray-700">
                    {sumIngredientsList.map((s, index) => (
                        <li key={index}>
                            {s.ingredientName}：{s.ingredientQuantity}{s.ingredientUnit}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">献立が登録されていません</p>
            )}
        </div>

    )
}

export default SumIngredients
import React from 'react'

const SumIngredients = ({sumIngredientsList}) => {
    return (
        <div>
            <div className='w-full mt-4 p-4 bg-gray-100 rounded-lg'>
                {sumIngredientsList.length > 0 ?
                    sumIngredientsList.map((s, index) => (
                        <ul className="list-disc pl-5 text-left" key={index}>
                            <li>{s.ingredientName}:{s.ingredientQuantity}{s.ingredientUnit}</li>
                        </ul>
                    )) : <p>献立が登録されていません</p>}
            </div>

        </div>
    )
}

export default SumIngredients
import { RecipeType } from '@/Types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    recipes: RecipeType[]
}

export const RecipeCards = ({ recipes }: Props) => {

    return (
        <div>
            <div className="w-full grid grid-cols-5 gap-4">
                {recipes.map((recipe) => (
                    <div className="w-60 h-60 shadow-md rounded-2xl overflow-hidden bg-white" key={recipe.id}>
                        <div className="w-full h-40 relative">
                            {recipe.recipeSignedurl ? (
                                <Image
                                    src={recipe.recipeSignedurl}
                                    alt=""
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                                    fill
                                    className="object-cover rounded-t-lg"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <span className="text-gray-600">画像がありません</span>
                                </div>
                            )}
                        </div>
                        <div className="px-3 py-2">
                            <p className="font-bold truncate">{recipe.recipeName}</p>
                            <Link href={`/recipe/${recipe.id}`} className="text-blue-500 hover:underline text-sm">
                                詳細へ
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default RecipeCards
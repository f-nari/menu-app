import { RecipeType } from '@/Types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const RecipeCards = ({recipeLists}) => {
    console.log('RecipeCardsに渡されたrecipeListsです',recipeLists);
    
    return (
        <div>
            <div className="w-full grid grid-cols-5 gap-4">
                {/* カード */}
                {recipeLists.map((recipeData) => (
                    <div className=" w-50 h-60 shadow-md rounded-2xl mr-5" key={recipeData.id}>
                        <div className="w-full  h-40 rounded-t-lg">
                            {recipeData.signedUrl ?
                                <Image src={recipeData.signedUrl} width={500} height={500} alt="" className="rounded-t-lg"></Image>
                                :
                                <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-t-lg">
                                    <span className="text-gray-600">画像がありません</span>
                                </div>
                            }

                        </div>
                        <div>{recipeData.name}</div>
                        <Link href={`/recipe/${recipeData.id}`}>詳細へ</Link>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default RecipeCards
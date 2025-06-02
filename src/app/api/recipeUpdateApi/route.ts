'use server'

import { Ingredients } from "@/Types/types"
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
//dataの中身。型定義しなきゃ
// {
//   recipeId: '80',
//   recipe: {
//     recipeName: '焼き肉',
//     recipeImageFile: 'https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/1747644845986_IMG_0782.JPG',
//     recipeMemo: 'よく焼く。たまに生でも良い',
//     ingredients: [ [Object], [Object], [Object] ]
//   }
// }

// recipeId: '106',
// recipe: {
//   recipeName: '画像保存テスと',
//   recipeImageFile: 'https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/1748825065671_undefined',
//   recipeMemo: 'あｇｆだだふぁｄがが',
//   ingredients: [ [Object], [Object] ]
// }
// }

type FetchRecipeType = {
  recipeId: string,
  recipe: {
    recipeName: string
    recipeImageFile: string,
    recipeMemo: string,
    ingredients: Ingredients[]
  }
}


export async function POST(req: Request) {
  const supabase = await createClient()
  let resData
  let data:FetchRecipeType
  try {
    resData = await req.json()
    data = resData.data
    console.log('data見てみる。多分、{}が原因。これでいいんちゃう？', data);

  } catch (error) {
    console.log('jsonエラー', error);
    return NextResponse.json({ error: 'jsonエラー' }, {
      status: 400
    })
  }

  const { error: updateError } = await supabase
    .from('recipes')
    .update({
      'name': data.recipe.recipeName,
      'memo': data.recipe.recipeMemo,
      'image_url': data.recipe.recipeImageFile
    })
    .eq('id', Number(data.recipeId))


  if (updateError) {
    console.error('recipesにアップデート時にエラー', updateError.message)
    return NextResponse.json({ error: 'レシピの更新に失敗' }, {
      status: 500
    })
  }


  const { error: deleteError } = await supabase
    .from('ingredients')
    .delete()
    .eq('recipe_id', data.recipeId)

  if (deleteError) {
    console.error('ingredientsテーブル削除時にエラー', deleteError.message);
    return NextResponse.json({ error: 'データの削除に失敗' }, {
      status: 500
    })
  }

  const ingredients = data.recipe.ingredients.map((ingredient) => ({
    'recipe_id': data.recipeId, 'title': ingredient.title, 'quantity': ingredient.quantity, 'unit': ingredient.unit
  }
  ))

  const { error: insertError } = await supabase
    .from('ingredients')
    .insert(ingredients)

  if (insertError) {
    console.error(insertError.message)
    return NextResponse.json({ error: 'データの登録に失敗' }, {
      status: 500
    })
  }


  return NextResponse.json({ success: true }, {
    status: 200
  })

}
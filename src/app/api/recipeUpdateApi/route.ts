'use server'

import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const supabase = await createClient()
  let data
  try {
    data = await req.json()
  } catch (error) {
    console.log('jsonエラー', error);
    return NextResponse.json({ error: 'jsonエラー' }, {
      status: 400
    })
  }

  const { error: updateError } = await supabase
    .from('recipes')
    .update({
      'name': data.recipeData.recipeName,
      'memo': data.recipeData.recipeMemo,
    })
    .eq('id', data.recipeId)

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

  const ingredients = data.recipeData.ingredients.map((ingredient) => ({
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
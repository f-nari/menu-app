'use server'

import { createClient } from "@/utils/supabase/server"

export async function POST(req:Request){
    const supabase = await createClient()
    const {data} = await req.json()

    const { error:updateError } = await supabase
        .from('recipes')
        .update({
            'name':`${data.recipeData.recipeName}`,
            'memo':`${data.recipeData.recipeMemo}`,
        })
        .eq('id', data.recipeId)
    
    if(updateError){    
        console.error(updateError)
        return new Response(JSON.stringify({ error: updateError.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      //一度データ削除
    const response = await supabase
        .from('ingredients')
        .delete()
        .eq('recipe_id', data.recipeId)

    const ingredients = data.recipeData.ingredients.map((ingredient)=>({
        'recipe_id':data.recipeId,'title':ingredient.title,'quantity':ingredient.quantity,'unit':ingredient.unit}
    ))

    const { error:insertError } = await supabase
        .from('ingredients')    
        .insert(ingredients)

        if(insertError){    
            console.error(insertError)
            return new Response(JSON.stringify({ error: insertError.message }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            })
          }

    return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
    
}
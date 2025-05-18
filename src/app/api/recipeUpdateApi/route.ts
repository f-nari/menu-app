'use server'

import { createClient } from "@/utils/supabase/server"

export async function POST(req:Request){
    const supabase = await createClient()
    const {data} = await req.json()
    // console.log("apiに渡されたデータです",data);

    console.log(data.recipeDetail[0].recipeMemo);
    
    const { error:updateError } = await supabase
        .from('recipes')
        .update({
            'name':`${data.recipeDetail[0].recipeName}`,
            'memo':`${data.recipeDetail[0].recipeMemo}`,
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


        // {recipe_id:  1,title: 'しめじ', quantity: 300, unit: 'g'}がほ(しい
    const insertData = data.ingredients.map((ingredient)=>({
        'recipe_id':data.recipeId,'title':ingredient.title,'quantity':ingredient.quantity,'unit':ingredient.unit}
    ))

    
        

    // // そして登録
    const { error:insertError } = await supabase
        .from('ingredients')    
        .insert(insertData)

    return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
    
}
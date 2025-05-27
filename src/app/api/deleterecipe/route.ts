import { createClient } from "@/utils/supabase/server";

export async function DELETE(req:Request){
    const supabase = await  createClient()
    const {recipeId} = await req.json()

    const recipesDeleteResponse = await supabase
            .from('recipes')
            .delete()
            .eq('id', recipeId)

    const ingredientsDeleteResponse = await supabase
            .from('ingredients')
            .delete()
            .eq('recipe_id', recipeId)

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    

}
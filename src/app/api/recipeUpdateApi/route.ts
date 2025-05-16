'use server'

import { createClient } from "@/utils/supabase/server"

export async function POST(req:Request){
    const supabase = await createClient()
    const {data} = await req.json()
    console.log("apiに渡されたデータです",data);
    // apiに渡されたデータです {
    //     recipeId: '76',
    //     ingredients: [
    //       { id: 1, title: 'しめじ', quantity: 300, unit: 'g' },
    //       { id: 2, title: ' カニカマ', quantity: 100, unit: 'g' }
    //     ],
    //     recipeDetail: [
    //       {
    //         recipeName: 'しめじとカニカマサラダ',
    //         recipeImageFile: 'https://mihayudoygfiuzekgjfo.supabase.co/storage/v1/object/public/recipeimages/1747120827208_IMG_0782.JPG',
    //         recipeMemo: 'しめじはレンチン！'
    //       }
    //     ]
    //   }

    console.log(data.recipeDetail[0].recipeMemo);
    
    const { error } = await supabase
        .from('recipes')
        .update({
            'name':`${data.recipeDetail[0].recipeName}`,
            'memo':`${data.recipeDetail[0].recipeMemo}`,
        })
        .eq('id', data.recipeId)
    
    if(error){    
        console.error(error)
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }
        

    return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
    
}
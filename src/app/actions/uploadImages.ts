'use server'

import { createClient } from "@/utils/supabase/server"

export const uploaaRecipeImage = async (recipeImageFile:File) => {
    const supabase = await createClient()
    const imageFileName = `${Date.now()}_${recipeImageFile?.name}`
    const { error:imageFileUploadError } = await supabase.storage
        .from('recipeimages')
        .upload(imageFileName, recipeImageFile)

    if(imageFileUploadError){
        console.log('画像のアップロードに失敗しました。',imageFileUploadError.message);
        return imageFileUploadError
    }

    const { data } = supabase.storage
        .from('recipeimages')
        .getPublicUrl(imageFileName)

    return data.publicUrl

}
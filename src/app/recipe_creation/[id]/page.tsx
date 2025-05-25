'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { usePathname, useRouter } from 'next/navigation'
import { Ingredients, PostRecipeDateil } from '@/Types/types'


const Recipe_Creation = () => {
    const [ingredientsstate, setIngredientstate] = useState<Ingredients[]>([{ id: 0, title: '', quantity: 0, unit: '' }])
    // const [memo, setMemo] = useState('')
    const [idCounter, setIdCounter] = useState(1)
    // const [recipename, setRecipeName] = useState('')
    // const [recipeImageFile, setRecipeImageFile] = useState<File | undefined>(undefined)
    // const [getRecipeDetail, setGetRecipeDetail] = useState<RecipeType>()
    const [postRecipeDateil, setPostRecipeDateil] = useState<PostRecipeDateil[]>([{
        recipeName: '',
        recipeImageFile: null,
        recipeMemo: '',
        ingredent: [],
    }])
    const getRecipeById = usePathname().replace('/recipe_creation/', '')
    const router = useRouter()


    useEffect(() => {
        const fetchRecipeDetail = async () => {
            const res = await fetch(`/api/getidrecipes?id=${getRecipeById}`)
            const data = await res.json()
            // setGetRecipeDetail(data)
            const newIngredient: Ingredients[] = []
            let currentId = idCounter;
            data.ingredientsDataList?.forEach(i => {
                newIngredient.push({
                    id: currentId, title: i.ingredientName, quantity: i.quantity, unit: i.unit,
                })
                currentId += 1
            })


            const fetchRecipeDetailWithRecipeNameAndImageFileAndRecipeMemo: PostRecipeDateil[] = [{
                recipeName: data.name,
                recipeImageFile: data.image_url,
                recipeMemo: data.memo,
            }]

            console.log(fetchRecipeDetailWithRecipeNameAndImageFileAndRecipeMemo);

            setPostRecipeDateil(fetchRecipeDetailWithRecipeNameAndImageFileAndRecipeMemo)

            setIngredientstate(newIngredient)
            setIdCounter(currentId)

        }
        fetchRecipeDetail()
    }
        , [getRecipeById])



    const changeIngredienteEvent = (e: React.ChangeEvent<HTMLInputElement>, genre: 'title' | 'quantity' | 'unit', id: number) => {
        const data = [...ingredientsstate]
        //title,unitならstringのため、そのままで良いが、quantityだった場合、numberである必要があるため、eを変換しなければならない
        const changeData = genre === 'quantity' ? Number(e.target.value) : e.target.value
        const newData = data.map(data =>
            data.id === id ? { ...data, [genre]: changeData } : data
        )
        setIngredientstate(newData)
    }

    const addIngredienteClickHandler = () => {
        const update = [...ingredientsstate, { id: idCounter, title: '', quantity: 0, unit: '' }]
        setIdCounter(idCounter => idCounter += 1)
        setIngredientstate(update)
    }

    const deleteIngredienteClickHandler = (id: number) => {
        const ingredientsList = [...ingredientsstate]
        const idDeleteIngredientsList = ingredientsList.filter(item => item.id !== id)
        setIngredientstate(idDeleteIngredientsList)
    }

    const changeRecipeNameImageFileMemo = (e: React.ChangeEvent<HTMLInputElement>, type: 'name' | 'imageFile' | 'memo') => {
        let updataValue: any

        if (type === 'imageFile') {
            updataValue = e.target.files?.[0]
        } else {
            updataValue = e.target.value
        }

        setPostRecipeDateil(prev => {
            const newArray = [...prev]
            newArray[0] = {
                ...newArray[0],
                [type === 'name' ?
                    'recipeName'
                    : type === 'memo' ?
                        'recipeMemo'
                        : 'recipeImageFile'
                ]: updataValue
            }
            return newArray
        }

        )
    }


    const recipeUpdate = async () => {
        const recipeIdAndIngredientAndRecipeDetail = {
            recipeId: getRecipeById,
            ingredients: ingredientsstate,
            recipeDetail: postRecipeDateil
        }
        const response = await fetch('/api/recipeUpdateApi', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            //必要なのは、getRecipeById、ingredientsstate,postRecipeDateilだな
            body: JSON.stringify({ data: recipeIdAndIngredientAndRecipeDetail })
        })

        const result = await response.json()

        if (result.success) {
            router.push('/')
        } else {
            console.log('エラーが発生');

        }


    }

    return (
        <div className='flex justify-center  h-screen text-[#4a4a4a]'>
            <div>編集画面です</div>
            {/* 詳細ゾーン */}
            <div className='w-11/12 flex flex-col  h-full '>
                {/* 上ゾーン */}
                <div className='flex mt-6' >
                    <div>
                        {/* <Image src={} height={500} width={500} alt='' className='rounded-2xl shadow-xl'></Image> */}
                        <input type="file" className='h-80 bg-[#f8f6f1]' onChange={(e) => changeRecipeNameImageFileMemo(e, 'imageFile')} />
                    </div>
                    {/*説明ゾーン */}
                    <div className='flex flex-col ml-3 '>
                        {/* <input type='text' value={recipeDetail?.name} className='text-3xl bg-[#f8f6f1] rounded-sm' onChange={(e) => setRecipeName(e.target.value)} placeholder='ハンバーグ' /> */}
                        <input type='text' defaultValue={postRecipeDateil[0].recipeName} className='text-3xl bg-[#f8f6f1] rounded-sm' onChange={(e) => changeRecipeNameImageFileMemo(e, 'name')} placeholder='ハンバーグ' />
                        <input type="text" placeholder='廣川郁也' />
                        <p className='text-2xl font-bold mt-5 mb-3'>材料</p>
                        {ingredientsstate.map((ingredient,) => (
                            <div className='flex' key={ingredient.id}>
                                <label htmlFor="" className='mr-4'>材料名</label>
                                <input type="text" value={ingredient.title} placeholder='ひき肉' className='bg-[#f8f6f1] rounded-sm' onChange={(e) => (changeIngredienteEvent(e, 'title', ingredient.id!))} />
                                <label htmlFor="" className='mr-4 ml-4' >量</label>
                                <input type="text" value={ingredient.quantity} placeholder='300' className='bg-[#f8f6f1] rounded-sm w-20' onChange={(e) => (changeIngredienteEvent(e, 'quantity', ingredient.id!))} />
                                <label htmlFor="" className='mr-4 ml-4'>単位</label>
                                <input type="text" value={ingredient.unit} placeholder='g' className='bg-[#f8f6f1] rounded-sm w-20' onChange={(e) => (changeIngredienteEvent(e, 'unit', ingredient.id!))} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteIngredienteClickHandler(ingredient.id!)} />
                            </div>

                        ))}
                        <button onClick={() => addIngredienteClickHandler()}>材料追加</button>
                    </div>
                </div>
                {/*下ゾーン memozorn*/}
                <div className='flex flex-col grow mt-5 '>
                    <h1 className='h-6'>memo</h1>
                    <input type="text" defaultValue={postRecipeDateil[0].recipeMemo} className='w-full  grow rounded-sm bg-[#f8f6f1] mb-2' onChange={(e) => changeRecipeNameImageFileMemo(e, 'memo')} placeholder='コツやポイント' />
                </div>
                <button className='border' type='submit' onClick={() => recipeUpdate()} >レシピ保存</button>

            </div>
        </div>
    )
}

export default Recipe_Creation

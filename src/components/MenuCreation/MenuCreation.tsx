import { MenuItemsType, RecipeType } from '@/Types/types'
import React, { useEffect, useState } from 'react'

const MenuCreation = () => {
    const [recipeLists, setRecipeLists] = useState<RecipeType[]>([])
    const [menuLists, setMenuLists] = useState<MenuItemsType[]>([{
        date: new Date,
        meal: {
            breakfast: '',
            lunch: '',
            dinner: '',
        }
    }])

      useEffect(() => {
        const fetchRecipes = async () => {
          const res = await fetch('/api/allgetrecipes')
          const data = await res.json()
          setRecipeLists(data)
        }
        fetchRecipes()
      }, [])

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, mealTime: string, propsindex: number) => {

        const changeMenuList = menuLists.map((menuList, index) => {
            if (index === propsindex) {
                const newMeal = { ...menuList.meal }
                let newDate = menuList.date

                switch (mealTime) {
                    case 'date':
                        newDate = new Date(e.target.value)
                        break
                    case 'breakfast':
                        newMeal.breakfast = e.target.value;
                        break;
                    case 'lunch':
                        newMeal.lunch = e.target.value;
                        break;
                    case 'dinner':
                        newMeal.dinner = e.target.value;
                        break;
                }
                return {
                    ...menuList,
                    date: newDate,
                    meal: newMeal
                }
            }

            return menuList
        })

        setMenuLists(changeMenuList)
    }

    const addNewMenuHandler = () => {
        const update = [...menuLists, {
            date: new Date,
            meal: {
                breakfast: '',
                lunch: '',
                dinner: '',
            }
        }]
        setMenuLists(update)
    }


    return (
        <div>
            <div className="h-60 flex  text-center ">
                {menuLists.map((menuList, index) => (
                    <div className="w-50" key={index}>
                        <input type="date" value={menuList.date.toISOString().split('T')[0]} onChange={(e) => changeHandler(e, 'date', index)} />
                        <div className="flex mt-3">
                            <label htmlFor="">朝</label>
                            <select name="" id="" className="ml-4 border-2 w-50 h-12" onChange={(e) => changeHandler(e, 'breakfast', index)}>
                                <option value="/" selected hidden>ーーー</option>
                                {recipeLists.map((recipeList) => (
                                    <>
                                        <option key={recipeList.id} value={recipeList.id}>{recipeList.name}</option>
                                    </>
                                ))}
                            </select>
                        </div>
                        <div className="flex mt-2">
                            <label htmlFor="">昼</label>
                            <select name="" id="" className="ml-4 border-2 w-50 h-12" onChange={(e) => changeHandler(e, 'lunch', index)}>
                                {recipeLists.map((recipeList) => (
                                    <>
                                        <option value="" selected hidden>ーーー</option>
                                        <option value={recipeList.id}>{recipeList.name}</option>
                                    </>
                                ))}
                            </select>
                        </div>
                        <div className="flex mt-2">
                            <label htmlFor="">夜</label>
                            <select name="" id="" className="ml-4 border-2 w-50 h-12" onChange={(e) => changeHandler(e, 'dinner', index)}>
                                {recipeLists.map((recipeList) => (
                                    <>
                                        <option value="" selected hidden>ーーー</option>
                                        <option value={recipeList.id}>{recipeList.name}</option>
                                    </>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
                <button onClick={() => addNewMenuHandler()}>追加</button>
            </div>


        </div>
    )
}

export default MenuCreation
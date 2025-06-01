'use client'

import React from 'react'

type Props = {
    name: string | undefined
}

export const RecipeName = ({ name }: Props) => {
    return (
        <h1 className="text-3xl font-bold">{name}</h1>
    )
}

export default RecipeName
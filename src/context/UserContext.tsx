'use client'

import { createClient } from "@/utils/supabase/client";
import { UserMetadata } from "@supabase/supabase-js"
import { createContext, useEffect, useState } from "react";

type UserContextType = {
    email: string
} | null

export const UserContext = createContext<UserContextType>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userEmail, setUserEmail] = useState<UserContextType>(null)
    useEffect(() => {
        const getUser = async () => {
            const supabase = await createClient()
            const { data,  } = await supabase.auth.getUser()
            const user_metadata = data.user?.user_metadata as UserMetadata
            const user_data = {
                email: user_metadata?.email
            }
            setUserEmail(user_data)
        }
        getUser()
    }, [])

    return (
        <UserContext.Provider value={userEmail}>
            {children}
        </UserContext.Provider>
    )
}


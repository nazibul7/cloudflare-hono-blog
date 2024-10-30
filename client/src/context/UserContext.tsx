import React, { createContext, useState } from "react";

type Prop = {
    children: React.ReactNode
}
type User = {
    email: string
    setEmail:(email:string)=>void
}
export const UserContext = createContext<User>({email: '',setEmail:()=>{} })

export const UserContextProvider = ({ children }: Prop) => {
    const [email,setEmail]=useState<string>('')
    return (
        <UserContext.Provider value={{email,setEmail}}>
            {children}
        </UserContext.Provider>
    )
}
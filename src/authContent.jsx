import React, { Children, createContext, useContext, useEffect, useState } from 'react';

const AuthContent=createContext();

export const useAuth=()=>{
    return useContext(AuthContent);
}

export const AuthProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    useEffect(()=>{
        const userId=localStorage.getItem("userId");
        if(userId){
            setCurrentUser(userId);
        }
    },[])

    const value={
        currentUser,
        setCurrentUser
    }
    
    return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>


}

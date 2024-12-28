import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext (null);

export default function WindowContext({children}){
    const [windowSize,setWindowSize]=useState(window.innerWidth);
    useEffect(()=>{
        function SetWindowSize(){
            setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize",SetWindowSize);
        return()=>{
            window.removeEventListener("resize",SetWindowSize)
        }
    },[])
    return <WindowSize.Provider value={{windowSize , setWindowSize}} >{children}</WindowSize.Provider>
}
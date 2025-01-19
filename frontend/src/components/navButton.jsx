import React from "react";

export const NavButton =({
    children,
    style
})=>{
    return  <button onClick={handleClick} className={`${style}`}>{children}</button>
}


function handleClick(){
    
}
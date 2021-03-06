import React from 'react'
import { Resizable } from "re-resizable";
import './resizable.css'
const Resize:React.FC=({children})=>{
    return (
        <Resizable 
         minWidth='50%'
         minHeight="45vh" 
         >
           {children}     
        </Resizable>
    )

}
export default Resize
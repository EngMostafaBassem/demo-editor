import React from 'react'
import { Resizable } from "re-resizable";
import './resizable.css'
import WidthRatio from '../../context/ratioContext'
import { useContext } from "react";
const Resize:React.FC=({children})=>{
    const [wRatio,handleWRatio]=useContext(WidthRatio)
   
    return (
        <Resizable onResize={(e,direction,ref,d)=>{
            handleWRatio(d.width)
        }} >
           {children}     
        </Resizable>
    )

}
export default Resize
import React, { useState } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor'
import Preview from '../Preview/Preview';
import bundle from '../../bundling/bundle'
import Resize from '../Resizable/Reziable';
import './code-cell.css'
import WidthRatio from '../../context/ratioContext';
import { useEffect } from 'react';
const CodeCell=()=>{

  const [code,setCode]=useState<string>('')
  const [wRatio,setWRatio]=useState<number>(0)
  let [transpiled,setTranspiled]=useState<string>()

   useEffect(()=>{
     setTimeout(async() => {
      let transplied=await bundle(code)
      setTranspiled(transplied)    
     }, 1000);
     return ()=>{
       clearTimeout()
     }

   })
  
  const handleCodeChange=(code:string)=>{
    setCode(code)
  }

 const handleWRatio=(wRatio:number)=>{
   setWRatio(wRatio)

 }
  return(
      <div className="container">
        <WidthRatio.Provider value={[wRatio,handleWRatio]}>
         <CodeEditor handleCodeChange={handleCodeChange} />
         <Preview processedCode={transpiled} wRatio={wRatio}/>
       </WidthRatio.Provider>
     </div>
  )
}
export default CodeCell

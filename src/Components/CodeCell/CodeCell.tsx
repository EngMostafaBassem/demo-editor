import React, { useCallback, useState } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor'
import Preview from '../Preview/Preview';
import bundle from '../../bundling/bundle'
import './code-cell.css'
import WidthRatio from '../../context/ratioContext';
import { useEffect } from 'react';
import EsbuildContext from '../../context/esbuildContext';
import { useContext } from 'react';
import { Cell } from '../../types-dictionary/cell';
import {Creators} from '../../store/redux/cell/actions'
import {useDispatch} from 'react-redux'

interface CodeCellProps{
  cell:Cell
}

const CodeCell:React.FC<CodeCellProps>=({cell})=>{

  const[error,setError]=useState<string>('')
  const [wRatio,setWRatio]=useState<number>(0)
  const esbuildStatus=useContext(EsbuildContext)
  const [transpiled,setTranspiled]=useState<string>()
  const dispatch=useDispatch()
   useEffect(()=>{

     setTimeout(async() => {
      let transplied=await bundle(cell.content,esbuildStatus) 
      setTranspiled(transplied?.code) 
      setError(transplied?.error?.message) 
     }, 1000);
     return ()=>{
       clearTimeout()
     }

   })
  

 const handleWRatio=(wRatio:number)=>{
   setWRatio(wRatio)

 }
 const handleCodeChange=useCallback((content:string)=>{
   dispatch(Creators.updateCellRequest(cell.id,content))
 },[cell])
  return(
      <div className="container">
        <WidthRatio.Provider value={[wRatio,handleWRatio]}>
         <CodeEditor handleCodeChange={handleCodeChange} />
         <Preview processedCode={transpiled}  error={error}/>
       </WidthRatio.Provider>
     </div>
  )
}
export default CodeCell

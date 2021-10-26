import React, { useCallback, useState } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor'
import Preview from '../Preview/Preview';
import bundle from '../../bundling/bundle'
import './code-cell.css'
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
  const esbuildStatus=useContext(EsbuildContext)
  const [transpiled,setTranspiled]=useState<string>()
  const dispatch=useDispatch()
   useEffect(()=>{
      console.log('cell content',cell.content)
      let timer= setTimeout(async() => {
                 let transplied=await bundle(cell.content,esbuildStatus)    
                 setTranspiled(transplied?.code) 
                 setError(transplied?.error?.message) 
     }, 850);

     return ()=>{
       clearTimeout(timer)
     }

   },[cell])
 const handleCodeChange=useCallback((content:string)=>{
   dispatch(Creators.updateCellRequest(cell.id,content))
 },[cell])
  return(
      <div className="container">
           <div className="code-cell-wrapper">
            <CodeEditor handleCodeChange={handleCodeChange} />
            <Preview processedCode={transpiled}  error={error}/>
          </div>
     </div>
  )
}
export default CodeCell

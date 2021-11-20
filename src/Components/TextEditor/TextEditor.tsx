import React, { useCallback } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import './TextEditor.css'
import { Cell } from '../../types-dictionary/cell';
import {useDispatch} from 'react-redux'
import {Creators} from '../../store/redux/cell/actions'
interface TextEditorProps{
    cell:Cell
}

const TextEditor:React.FC<TextEditorProps>=({cell})=>{
    const [previewMode,setPreviewMode]=useState<boolean>(true)
    const refDiv=useRef<HTMLDivElement>(null)
    const dispatch=useDispatch()
    const hadnleText= useCallback((value:string|undefined)=>{
        dispatch(Creators.updateCellRequest(cell.id,value))    
    },[cell.content])

    useEffect(()=>{
        const handlePreview=(e:Event)=> {
            if(refDiv.current?.contains(e.target as Node)&&previewMode==false){     
                return
            }
            if(refDiv.current?.contains(e.target as Node)==false&&previewMode==true){         
                return
            }
            setPreviewMode(previewMode=>!previewMode)
           
         
        }
       
        document.addEventListener('click',handlePreview,{capture:true})
        return ()=>{
            document.removeEventListener('click',handlePreview,{capture:true})
        }
    })
    return(
        <div ref={refDiv} className="text-editor-container">
            {
            previewMode?
             <MDEditor.Markdown source={cell.content||'Click here for editing....'} />:        
             <MDEditor
              value={cell.content}
              onChange={hadnleText}   
      />
            }
        </div>
    )

}

export default TextEditor
import React from 'react'
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const TextEditor=()=>{
    const [text,setText]=useState<string|''>('')
    const [previewMode,setPreviewMode]=useState<boolean>(false)
    const refDiv=useRef<HTMLDivElement>(null)
    const hadnleText=(value:string|undefined)=>{
        setText(value||'')
    }

    useEffect(()=>{
        const handlePreview=(e:Event)=> {
            if(refDiv.current?.contains(e.target as Node)){
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
        <div ref={refDiv}>
            {
            previewMode?
             <MDEditor.Markdown source={text} />:        
             <MDEditor
              value={text}
              onChange={hadnleText}   
      />
            }
        </div>
    )

}

export default TextEditor
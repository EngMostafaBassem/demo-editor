import React,{useRef,useEffect,useContext} from 'react'
import { useState } from 'react'
import WidthRatio from '../../context/ratioContext'
import './preview.css'
interface PreviewPros{
    processedCode:string|undefined,
    error:any
}  

const Preview:React.FC<PreviewPros>=({processedCode,error})=>{
    const html=`<html>
    <body><div id='root'></div>
    
    <script> 
    const handleError=(error)=>{
        document.querySelector('#root').innerHTML=error
        document.querySelector('#root').style.color='red'
    }
    
    window.addEventListener('error',(event)=>{
        event.preventDefault()
        handleError(event.error)      
    })
    
    window.addEventListener('message',(event)=>{
        try{          
                document.querySelector('#root').innerHTML=''
                document.querySelector('#root').style.color='#555555'
                eval(event.data)
            
               
        }catch(ex){
            handleError(ex)
        }
    
    })
    </script>
    </body>
    </html>`
    let iFrameRef=useRef<any>()
    const [wRatio,handleWRatio]=useContext(WidthRatio)
    useEffect(()=>{     
        iFrameRef.current.srcDoc=html   
        iFrameRef.current.contentWindow.postMessage(processedCode,'*')
      },[processedCode])
   console.log('transpiled',processedCode)
    return(
         
        <div className="preview" style={{width:wRatio<0?`calc(50% + ${Math.abs(wRatio)}px)`: `calc(50% + ${wRatio}px)`}}>     
            <iframe srcDoc={html} ref={iFrameRef} sandbox='allow-scripts' ></iframe> 
            {error&&<div className='error-formating'>{error}</div>}    
        </div>
      
    )

}
export default Preview
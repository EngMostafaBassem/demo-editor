import React,{useRef,useEffect,useContext} from 'react'
import { useState } from 'react'
import WidthRatio from '../../context/ratioContext'
import Resize from '../Resizable/Reziable'
import './preview.css'
interface PreviewPros{
    processedCode:string|undefined,
    wRatio:number
}  
let html=`<html>
<body><div id='root'></div>
<script>
window.addEventListener('message',(event)=>{
 eval(event.data)
})
</script>
</body>
</html>`
const Preview:React.FC<PreviewPros>=({processedCode})=>{
    let iFrameRef=useRef<any>()
    const [wRatio,handleWRatio]=useContext(WidthRatio)
    console.log('wRatio',wRatio)
    useEffect(()=>{
        iFrameRef.current.srcDoc=html
        iFrameRef.current.contentWindow.postMessage(processedCode,'*')
      },[processedCode])
   
    return(
         
        <div className="preview" style={{width:wRatio<0?`calc(50% + ${Math.abs(wRatio)}px)`: `calc(50% + ${wRatio}px)`}}>     
            <iframe srcDoc={html} ref={iFrameRef} sandbox='allow-scripts' ></iframe>     
        </div>
      
    )

}
export default Preview
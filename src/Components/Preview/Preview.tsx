import React,{useRef,useEffect,useContext} from 'react'
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
    const root=document.querySelector('#root')
    console.log('error',error)
    root.innerHTML='<p style="color:red">'+error+'</p>'
}

window.addEventListener('error',(event)=>{
    event.preventDefault()
    handleError(event.error)      
})

window.addEventListener('message',(event)=>{
    try{          
      eval(event.data)
    }catch(ex){
        handleError(ex)
    }

},false);
</script>
</body>
</html>`
    const iFrameRef=useRef<any>()
    useEffect(()=>{ 
            iFrameRef.current.srcdoc=html 
            setTimeout(() => {
                iFrameRef.current.contentWindow.postMessage(processedCode,'*')
            }, 50);
           
      },[processedCode])
    return(
         
        <div className="preview">     
            <iframe title="preview"  ref={iFrameRef} sandbox='allow-scripts' srcDoc={html} ></iframe> 
            {error&&<div className='error-formating'>{error}</div>}    
        </div>
      
    )

}
export default Preview
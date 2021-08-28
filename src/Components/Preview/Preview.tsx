import React,{useRef,useEffect} from 'react'
interface PreviewPros{
    processedCode:string|undefined
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
    useEffect(()=>{
        iFrameRef.current.srcDoc=html
        iFrameRef.current.contentWindow.postMessage(processedCode,'*')
      },[processedCode])
   
    return(
        <div>
            <iframe srcDoc={html} ref={iFrameRef} sandbox='allow-scripts'></iframe>
        </div>
    )

}
export default Preview
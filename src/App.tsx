import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as esbuild from 'esbuild-wasm'
import pathPlugin from './plugins/pathPlugin';
import fetchPlugin from './plugins/fetchPlugin';
import Editor from "@monaco-editor/react";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
const App=()=>{
  let esbuildRef=useRef<any>()
  const [code,setCode]=useState<string>('')
  let [transpiled,setTranspiled]=useState<string>()
  let iFrameRef=useRef<any>()
  let html=`<html>
           <body><div id='root'></div>
           <script>
         
           window.addEventListener('message',(event)=>{
            eval(event.data)
           })
           </script>
           </body>
           </html>`
  const startService=async()=>{
    await esbuild.initialize({wasmURL:'/esbuild.wasm',worker:true})
    esbuildRef.current=true

  }

  useEffect(()=>{
   startService()
  },[])
  const run=async()=>{
    if(!esbuildRef) return
    let result:esbuild.BuildResult=await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write:false,
      minify:true,
      plugins:[pathPlugin(),fetchPlugin(code)],
    
      
    })
    if(result&&result?.outputFiles){
      setTranspiled(result.outputFiles[0].text)   
    }
    iFrameRef.current.srcDoc=html
    
  }
  useEffect(()=>{
    iFrameRef.current.contentWindow.postMessage(transpiled,'*')
  },[transpiled])
  
  const handelEditorChange=(value:any)=>{
   setCode(value)
  }
  const handleEditorValidation=(markers:any) =>{
    // model markers
    markers.forEach((marker:any) => console.log("onValidate:", marker.message));
  }
  return(
    <div>
      <Editor height="90vh" 
      theme="dark"
      defaultLanguage="javascript"
      onChange={handelEditorChange}
      defaultValue="// let's write some broken code 😈"
      
      options={{
        wordWrap:'on',
        minimap:{enabled:false},
        showUnused:false,
        folding:false,
        lineNumbersMinChars:3,
        fontSize:16,
        scrollBeyondLastLine:false
       
        
        }}/>
  
    
    <br/>
    <button onClick={run}>Run</button>
    <br/>
    <iframe srcDoc={html} ref={iFrameRef} sandbox='allow-scripts'></iframe>
    </div>
  )
}
export default App

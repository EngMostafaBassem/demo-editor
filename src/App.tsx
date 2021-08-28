import 'bulmaswatch/superhero/bulmaswatch.min.css'
import CodeCell from './Components/CodeCell/CodeCell';
import './App.css'
import { useEffect } from 'react';
import * as esbuild from 'esbuild-wasm'
import EsbuildContext from './context/esbuildContext';
import { useState } from 'react';
const App=()=>{
  const [esbuildStatus,setEsbuildStatus]=useState<boolean>(false)
  const  startService= async()=>{
    if(!esbuildStatus){
      await esbuild.initialize({wasmURL:'/esbuild.wasm',worker:true})
      setEsbuildStatus(true)
    } 
  }
  useEffect(()=>{
    startService()
  },[])

  return(
    <EsbuildContext.Provider value={esbuildStatus}>   
      <CodeCell/>   
      <CodeCell/> 
      <CodeCell/>   
    </EsbuildContext.Provider>
  )
}
export default App

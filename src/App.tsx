import 'bulmaswatch/superhero/bulmaswatch.min.css'
import CodeCell from './Components/CodeCell/CodeCell';
import './App.css'
import { useEffect } from 'react';
import * as esbuild from 'esbuild-wasm'
const App=()=>{
  const  startService= async()=>{
    await esbuild.initialize({wasmURL:'/esbuild.wasm',worker:true})
  }
  useEffect(()=>{
    startService()
  },[])

  return(
    <div>
     <CodeCell/>   
     <CodeCell/>      
    </div>
  )
}
export default App

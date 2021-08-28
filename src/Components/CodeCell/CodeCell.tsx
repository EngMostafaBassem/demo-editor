import React, { useState } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview/Preview';
import bundle from '../../bundling/bundle'
const CodeCell=()=>{

  const [code,setCode]=useState<string>('')
  let [transpiled,setTranspiled]=useState<string>()

  const run=async()=>{
    let transplied=await bundle(code)
      setTranspiled(transplied)    
  }

  const handleCodeChange=(code:string)=>{
    setCode(code)
  }
 
  return(
    <div>
     <CodeEditor handleCodeChange={handleCodeChange} />
     <button onClick={run}>Run</button>
     <Preview processedCode={transpiled}/>
    </div>
  )
}
export default CodeCell

import React from 'react'
import Editor from "@monaco-editor/react";

interface CodeEditorProps{
    handleCodeChange:(code:string)=>void
}
const CodeEditor:React.FC<CodeEditorProps>=({handleCodeChange})=>{
    const handelEditorChange=(value:any)=>{
        handleCodeChange(value)
       }
    return (
    <>
     <Editor height="40vh" 
      defaultLanguage="javascript"
      onChange={handelEditorChange}
      theme="vs-dark"
      defaultValue="// let's write some code .."      
      options={{
        wordWrap:'on',
        minimap:{enabled:false},
        showUnused:false,
        folding:false,
        lineNumbersMinChars:3,
        fontSize:16,
        scrollBeyondLastLine:false,
     
        }}/>
    </>
    )

}
export default CodeEditor
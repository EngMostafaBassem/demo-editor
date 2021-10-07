import Editor from "@monaco-editor/react";
import './code-editor.css'
import Resize from '../Resizable/Reziable';

interface CodeEditorProps{
    
    handleCodeChange:(id:string)=>void
  
}
const CodeEditor:React.FC<CodeEditorProps>=({handleCodeChange})=>{
   
    const handelEditorChange=(value:any)=>{
        handleCodeChange(value)
       }
    return (
    <div className='editor-container'>
    <Resize >
        <div>
        <Editor 
      height="45vh" 
      width="100%"
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
        </div>
        </Resize>
    </div>
    )

}
export default CodeEditor
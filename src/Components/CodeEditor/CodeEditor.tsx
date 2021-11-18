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
      <Resize>
        <div className='editor-container'>
         <Editor 
          height="100%" 
          defaultLanguage="javascript"
          onChange={handelEditorChange}
          theme="vs-dark"
          defaultValue="// let's write some code.. , use show() for display something"      
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
    )

}
export default CodeEditor
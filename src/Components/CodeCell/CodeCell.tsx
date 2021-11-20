import CodeEditor from '../CodeEditor/CodeEditor'
import Preview from '../Preview/Preview';
import './code-cell.css'
import { useEffect,useCallback } from 'react';
import EsbuildContext from '../../context/esbuildContext';
import { useContext } from 'react';
import { Cell } from '../../types-dictionary/cell';
import {Creators as CellCreators} from '../../store/redux/cell/actions'
import {useDispatch, useSelector} from 'react-redux'
import {ReduxStoreTypes} from '../../store/redux/rootReducer'
import  {Creators as bundleCreators} from '../../store/redux/bundle/actions'
import useCommulative from './useCommulative';

interface CodeCellProps{
  cell:Cell
}

const CodeCell:React.FC<CodeCellProps>=({cell})=>{

  const bundleState=useSelector((store:ReduxStoreTypes)=>store.bundleReducer)
  const esbuildStatus=useContext(EsbuildContext)
  const commulativeCode=useCommulative(cell.content??'')
  
  const dispatch=useDispatch()
   useEffect(()=>{
      let timer= setTimeout(async() => {
         if(esbuildStatus) dispatch(bundleCreators.bundleGetRequest(cell.id,commulativeCode))                   
     }, 850);

     return ()=>{
       clearTimeout(timer)
     }

   },[cell])


 
 const handleCodeChange=useCallback((content:string)=>{
   dispatch(CellCreators.updateCellRequest(cell.id,content))
 },[cell])
  return(
      <div className="container">
           <div className="code-cell-wrapper">
             <CodeEditor handleCodeChange={handleCodeChange} />
             <Preview  processedCode={bundleState[cell.id]?.code??''}  error={bundleState[cell.id]?.error?.message??''}/>
          </div>
     </div>
  )
}
export default CodeCell

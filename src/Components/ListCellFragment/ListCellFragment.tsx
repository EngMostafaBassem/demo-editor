import React, { Fragment } from 'react'
import { Cell } from '../../types-dictionary/cell'
import AddButton from '../AddButton/AddButton'
import ButtonBar from '../ButtonBar/ButtonBar'
import CodeCell from '../CodeCell/CodeCell'
import TextEditor from '../TextEditor/TextEditor'
import './ListCellFragment.css'

interface ListCellFragProps{
    cell:Cell
}
const ListCellFragment:React.FC<ListCellFragProps>=({cell})=>{
    const renderCell=cell.type=='code'?<CodeCell cell={cell}/>:<TextEditor cell={cell}/>
    return(
        <Fragment>
           
            <div className='fragment-container'>
            <ButtonBar id={cell.id}/>
               {renderCell}           
            </div>
            <AddButton preCellId={cell.id}/> 
        </Fragment>
    )

}
export default ListCellFragment
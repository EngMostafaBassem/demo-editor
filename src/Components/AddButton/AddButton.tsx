import React from 'react'
import './AddButton.css'
import {useDispatch} from 'react-redux'
import {Creators} from '../../store/redux/cell/actions'

interface AddButtonProps{
    preCellId:string|null
}
const AddButton:React.FC<AddButtonProps>=({preCellId})=>{  
    const dispatch=useDispatch()
    return(
        <div className='add-btn-container'>
            <button  className='button is-primary is-rounded'
                     onClick={()=>dispatch(Creators.insertAfterCellRequest(preCellId,'text'))} 
                     >Add Text +
            </button>
            <button  className='button is-primary is-rounded'
                     onClick={()=>dispatch(Creators.insertAfterCellRequest(preCellId,'code'))} 
                     >Add Code +
            </button>
            <div className="border-container">&nbsp;</div>
        </div>
    )

}
export default AddButton
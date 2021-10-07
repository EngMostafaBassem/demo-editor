import React from 'react'
import  './ButtonBar.css'
import {ReactComponent as RemoveCellIcon} from '../../assets/icons/cancel.svg'
import {ReactComponent as DownCellIcon} from '../../assets/icons/down-arrow.svg'
import {ReactComponent as UpCellIcon} from '../../assets/icons/up-arrow-1.svg'
import {useDispatch}from 'react-redux'
import {Creators} from '../../store/redux/cell/actions'
interface ButtonBarProps{
    id:string
}
const ButtonBar:React.FC<ButtonBarProps>=({id})=>{
    const dispatch=useDispatch()
    return(
        <div className='btn-container'>
            <button className='button is-primary' 
                    onClick={()=>dispatch(Creators.deleteCellRequest(id))}>  
                   <RemoveCellIcon  width={10} height={10} fill='white'/>
            </button>
            <button className='button is-primary' 
                    onClick={()=>dispatch(Creators.moveCellRequest(id,'down'))}> 
                    <DownCellIcon   width={10} height={10} fill='white'/>
            </button>
            <button className='button is-primary' 
                    onClick={()=>dispatch(Creators.moveCellRequest(id,'up'))}> 
                    <UpCellIcon     width={10} height={10} fill='white'/>
            </button>
        </div>
    ) 
}
export default ButtonBar
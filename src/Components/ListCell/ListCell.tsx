import React from 'react'
import ListCellFragment from '../ListCellFragment/ListCellFragment'
import {useDispatch,useSelector} from 'react-redux'
import {Creators} from '../../store/redux/cell/actions'
import {ReduxStoreTypes} from '../../store/redux/rootReducer'
import AddButton from '../AddButton/AddButton'
const ListCell=()=>{
    const dispatch=useDispatch()
    const cellData=useSelector((store:ReduxStoreTypes)=>store.cellRedcuer)
    console.log('cell data',cellData)
    return(
      <div>
           <AddButton preCellId={null}/> 
           {
            cellData?.orders.map((order:string)=><ListCellFragment key={order} cell={cellData.data[order]}/>)
           }   
      </div>
  )
}
export default ListCell
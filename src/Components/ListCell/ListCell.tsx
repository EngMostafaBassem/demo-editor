import React from 'react'
import ListCellFragment from '../ListCellFragment/ListCellFragment'
import {useSelector} from 'react-redux'
import {ReduxStoreTypes} from '../../store/redux/rootReducer'
import AddButton from '../AddButton/AddButton'
const ListCell=()=>{
    const cellData=useSelector((store:ReduxStoreTypes)=>store.cellRedcuer)
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
import {createReducer} from 'reduxsauce'
import { Cell } from '../../../types-dictionary/cell'
import Types from './action-types'
import produce from 'immer'

export interface cellState{
    isLoading:boolean,
    hasError:string|'',
    orders:string[]
    data:{[key:string]:Cell}
}
export const INITIAL_STATE:cellState={
  isLoading:false,
  orders:[],
  hasError:'',
  data:{}
}
export const moveCellReducer=produce((state:cellState=INITIAL_STATE,action:any)=>{
    const {id,direction}=action
    let index=state.orders.findIndex((item)=>item===id)
    let targetIndex:number=-1
    if(index!=-1){
        targetIndex= (direction=='up')?index-1:index+1
    }
    if(targetIndex>=0&&targetIndex<state.orders.length){
        let tmp=state.orders[index]
        state.orders[index]=state.orders[targetIndex]
        state.orders[targetIndex]=tmp
    }
    return state
})
export const updateCellReducer=produce((state:cellState=INITIAL_STATE,action:any)=>{
   
    const {id,content}=action
    state.data[`${id}`].content=content
    return state
})
export const deleteCellReducer=produce((state:cellState=INITIAL_STATE,action:any)=>{
      const {id}=action
      delete state.data[`${id}`]
      let targetIndex=state.orders.findIndex((item)=>item===id)
      if(targetIndex!=-1)state.orders.splice(targetIndex,1)
     
    return state
})
export const insertCellAfterReducer=produce((state:cellState=INITIAL_STATE,action:any)=>{
    const {typeCell,preCellId}=action
    let id=Math.random().toString(34).substr(4,6)
    state.data[`${id}`]={id,type:typeCell,content:''}
    let targetIndex=state.orders.findIndex(item=>item==preCellId)
    if(targetIndex==-1){
        state.orders.unshift(id)
    }
    else{
        state.orders.splice(targetIndex+1,0,id)
    } 
    return  state
})

export const HANDLERS={
    [Types.MOVE_CELL_REQUEST]:moveCellReducer,
    [Types.UPDATE_CELL_REQUEST]:updateCellReducer,
    [Types.DELETE_CELL_REQUEST]:deleteCellReducer,
    [Types.INSERT_AFTER_CELL_REQUEST]:insertCellAfterReducer

}
export default createReducer(INITIAL_STATE,HANDLERS)
import {createReducer} from 'reduxsauce'
import { Cell } from '../../../types-dictionary/cell'
import Types from './action-types'

export interface cellState{
    isLoading:boolean,
    hasError:string|'',
    orders:string[]
    data:{['key']:Cell}|{}
}
export const INITIAL_STATE:cellState={
  isLoading:false,
  orders:[],
  hasError:'',
  data:{}
}
export const moveCellReducer=(state:cellState=INITIAL_STATE,action:any)=>{
    return {...state}
}
export const updateCellReducer=(state:cellState=INITIAL_STATE,action:any)=>{
    const {id,payload}=action
    return {...state,data:{...state.data,[`${id}`]:{content:payload}}}
}
export const deleteCellReducer=(state:cellState=INITIAL_STATE,action:any)=>{
    return {...state}
}
export const insertCellBeforeReducer=(state:cellState=INITIAL_STATE,action:any)=>{
    return {...state}
}

export const HANDLERS={
    [Types.MOVE_CELL_REQUEST]:moveCellReducer,
    [Types.UPDATE_CELL_REQUEST]:updateCellReducer,
    [Types.DELETE_CELL_REQUEST]:deleteCellReducer,
    [Types.INSERT_BEFORE_CELL_REQUEST]:insertCellBeforeReducer

}
export default createReducer(INITIAL_STATE,HANDLERS)
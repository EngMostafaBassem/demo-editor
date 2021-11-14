
import produce from 'immer'
import {createReducer} from 'reduxsauce'
import {Types} from './actions'
export interface BundleReducerTypes{
  
        [key:string]:{
            loading:boolean
            code:string,
            error:any
        }
    
}

const INITIAL_STATE:BundleReducerTypes={}


export const getBundleRequest=produce((state=INITIAL_STATE,action:any)=>{
    state[action.cellId]={loading:true,code:'',error:''}
    return state

})

export const getBundleRequestSuccess=produce((state=INITIAL_STATE,action:any)=>{
    state[action.cellId]={loading:false,code:action.transpiledCode,error:''}
    return state
})

export const getBundleRequestError=produce((state=INITIAL_STATE,action:any)=>{
    console.log('the error is ',action.error)

    state[action.cellId]={loading:false,code:'',error:action.error}
      return state
})

export const HANDLERS={
    [Types.BUNDLE_GET_REQUEST]:getBundleRequest,
    [Types.BUNDLE_GET_REQUEST_SUCCESS]:getBundleRequestSuccess,
    [Types.BUNDLE_GET_REQUEST_FAILURE]:getBundleRequestError,

}
export default createReducer(INITIAL_STATE,HANDLERS)
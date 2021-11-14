import {takeLatest,put,call} from 'redux-saga/effects'
import {Types,Creators} from '../../redux/bundle/actions'
import bundle from  '../../../bundling/bundle'

function*handleGet({cellId,rawCode}:any):any{
    
  try{
    const transpiled=yield call(bundle,rawCode,true)
   
    if(transpiled?.error){    
       yield put(Creators.bundleGetRequestFailure(cellId,transpiled?.error))
    }
    else{
     yield put(Creators.bundleGetRequestSuccess(cellId,transpiled?.code))
       }
  }
  catch(ex){ 
     
      yield put(Creators.bundleGetRequestFailure(cellId,ex))
  }
}
function*watchGet(){
    yield takeLatest(Types.BUNDLE_GET_REQUEST,handleGet)

}
export default watchGet
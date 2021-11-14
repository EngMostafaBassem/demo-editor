import {all} from 'redux-saga/effects'
import watchGet from './get'
 function*rootSaga(){
     yield all([watchGet()])

}
export default rootSaga
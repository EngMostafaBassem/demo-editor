import {all} from 'redux-saga/effects'
import watchBundle from './bundle'
 function*rootSaga(){
     yield all([watchBundle()])

}
export default rootSaga
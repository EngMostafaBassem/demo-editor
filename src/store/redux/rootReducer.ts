import  {combineReducers} from 'redux'
import cellRedcuer from './cell/reducer'
import bundleReducer from  './bundle/reducer'
export const rootReducer=combineReducers({
    cellRedcuer:cellRedcuer,
    bundleReducer:bundleReducer
})
export type  ReduxStoreTypes=ReturnType<typeof rootReducer>
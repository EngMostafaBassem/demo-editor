import  {combineReducers} from 'redux'
import cellRedcuer from './cell/reducer'
export const rootReducer=combineReducers({
    cellRedcuer:cellRedcuer
})
export type  ReduxStoreTypes=ReturnType<typeof rootReducer>
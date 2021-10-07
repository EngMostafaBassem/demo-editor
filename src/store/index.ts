import  {createStore} from 'redux'
import {rootReducer} from './redux/rootReducer'
import {Creators} from './redux/cell/actions'
const store=createStore(rootReducer)
export default store
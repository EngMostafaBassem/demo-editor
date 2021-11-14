import {createActions} from 'reduxsauce'
export const {Types,Creators}=createActions({
 bundleGetRequest:['cellId','rawCode'],
 bundleGetRequestSuccess:['cellId','transpiledCode'],
 bundleGetRequestFailure:['cellId','error'],
})

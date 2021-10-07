import {createActions} from 'reduxsauce'
export const {Types,Creators}=createActions({
 moveCellRequest:['id','direction'],
 updateCellRequest:['id','content'],
 deleteCellRequest:['id'],
 insertAfterCellRequest:['preCellId','typeCell']
})

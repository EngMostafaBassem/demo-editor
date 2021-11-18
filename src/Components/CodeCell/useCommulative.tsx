
const useCommulative=(content:string)=>{
    const comulativeCode=[`
    import _React from 'react'
    import _ReactDOM from 'react-dom'
     const show=(val)=>{
              let root=document.querySelector('#root')
              if(typeof(val)=='object'){
                  if(val.$$typeof&&val.props){
                      _ReactDOM.render(val,root)
                  }
                  else{
                   root.innerHTML=JSON.stringify(val)
                  }   
              }
              else{
                  root.innerHTML=val
              }     
            } 
    `]
    return [...comulativeCode,content].join('')

}
export default useCommulative
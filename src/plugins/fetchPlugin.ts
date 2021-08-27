import * as esbuild from 'esbuild-wasm'
import * as localforage from 'localforage'
import axios from 'axios'

const fetchPlugin=(code:string):esbuild.Plugin =>({
    name: 'fetchPlugin',
    setup(build:esbuild.PluginBuild) {

      build.onLoad({ filter: /^index\.js$/, namespace: 'env-ns' }, () => {
          let result:esbuild.OnLoadResult= {
            contents: `${code}`,
            loader: 'jsx',
            }
         return result
    }) 
    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, async (args) => {
        let result=await localforage.getItem<esbuild.OnLoadResult>(args.path)
        if(result){
            return result
        }
        
  })
    build.onLoad({ filter: /\.css$/, namespace: 'env-ns' },async (args) => {
        let {data,request}=await axios.get(args.path)
        let filterdData=data.replace(/\n/g,'')
        let contentCSS=`let style=document.createElement('style')
                         style.innerText='${filterdData}'
                         document.head.appendChild(style)
        `  
        let result:esbuild.OnLoadResult= {
          contents: contentCSS,
          loader: 'jsx',
          resolveDir:new URL('.',request.responseURL).pathname
          }
          await localforage.setItem(args.path,result)

       return result
    }) 

     build.onLoad({ filter: /.*/, namespace: 'env-ns' },async (args) => {
        let {data,request}=await axios.get(args.path)
        let result:esbuild.OnLoadResult= {
          contents: data,
          loader: 'jsx',
          resolveDir:new URL('.',request.responseURL).pathname
          }
          await localforage.setItem(args.path,result)
       return result
    }) 

    
      
      
    },
  })
  export default fetchPlugin
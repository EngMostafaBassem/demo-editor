import * as esbuild from 'esbuild-wasm'
import pathPlugin from '../bundling/plugins/pathPlugin';
import fetchPlugin from '../bundling/plugins/fetchPlugin';
let once=true
const bundle=async (rawCode:string)=>{

    if(once){
        await esbuild.initialize({wasmURL:'/esbuild.wasm',worker:true})
        once=false  
    }
   
    let result:esbuild.BuildResult=await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write:false,
        minify:true,
        plugins:[pathPlugin(),fetchPlugin(rawCode)],
      
      })
      return result&&result?.outputFiles?result.outputFiles[0].text:undefined
}

export default bundle
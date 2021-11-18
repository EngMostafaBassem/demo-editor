import * as esbuild from 'esbuild-wasm'
import pathPlugin from '../bundling/plugins/pathPlugin';
import fetchPlugin from '../bundling/plugins/fetchPlugin';

const bundle=async(rawCode:string,isIntialized:boolean):Promise<{code:string,error:any}>=>{  
     
        if(isIntialized){
            try{         
            let result:esbuild.BuildResult=await esbuild.build({
                entryPoints: ['index.js'],
                bundle: true,
                write:false,
                minify:true,
                plugins:[pathPlugin(),fetchPlugin(rawCode)],
                jsxFactory:'_React.createELement',
                jsxFragment:'_React.Fragment'       
              })
            return  result&&result?.outputFiles?{code:result.outputFiles[0].text,error:''}:{code:'',error:''}
            }
            catch(ex){
               
                return {code:'',error:ex}
            }
        }
        return {code:'',error:''}
  
}

export default bundle
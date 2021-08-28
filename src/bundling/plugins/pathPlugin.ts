import * as esbuild from 'esbuild-wasm'
const pathPlugin=()=> {
return{
    name: 'pathPlugin',
    setup(build:esbuild.PluginBuild) {
      
      build.onResolve({ filter: /^index\.js$/ }, args => ({
        path: args.path,
        namespace: 'env-ns',
      }))
  
       build.onResolve({ filter: /\.+\// }, args => {      
           console.log(args.resolveDir) 
        return{
                path: new URL(args.path,`https://unpkg.com${args.resolveDir}/`).href,
                namespace: 'env-ns',
              }})
       
        build.onResolve({ filter: /.*/ }, args => {
        return{
                    path: `https://unpkg.com/${args.path}`,
                    namespace: 'env-ns',
                  }})
        
        
    },
}
  }
  export default pathPlugin
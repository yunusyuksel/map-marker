
export default function setupAxios(axios, store) {
    axios.interceptors.request.use(

        
        config=>{
            
        
        if(process.env.NODE_ENV==='development'){
            
            console.log(`%cDev:Config: \n`,"color:green; font-weight:bold; font-size:11.5px",config)
            
        }
        return config
    },
    err => Promise.reject(err)
    )

    axios.interceptors.response.use(function (response) {
    
        if(process.env.NODE_ENV==='development')
            console.log(`%cDev:Response: \n%c\n${response.config.method.toUpperCase()}  \n\n%c${response.config.url}`,"color:green; font-weight:bold; font-size:11.5px","color:blue; font-weight:bold; font-size:11.5px","color:green; font-weight:bold; font-size:11px",response)
        return response
    },function (error){
        return Promise.reject(error)
    }

    )
  }

  
  
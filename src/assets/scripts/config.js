import axios from 'axios';

//const LOOK = process.env.LOOK_API;
//const BASE = process.env.BASE_API;



//axios.defaults.baseURL = '/api';
//axios.defaults.headers.common['Authorization'] = '1111';
//axios.defaults.crossDomain = true;
axios.defaults.withCredentials=true;

axios.interceptors.request.use(function(config){
   config.headers = {
     'content-Type':' text/plain',
   }
    return config;
},
    function(error){
        return Promise.reject(error);
});

axios.interceptors.response.use((response)=>{
    
    return response.data
},(error)=>{
    return Promise.reject(error);
});
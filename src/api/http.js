import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000;
axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    console.log(error)
    return Promise.reject(error);
  });

  // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
  
    return response;
  }, function (error) {


    return Promise.reject(error);
  });



const fetch = (method,url,data,sum)=>{
    let obj;
    if(sum){
        obj = {
            method: method,
            url: url,
            data: data,
            params: data
        }
    } else{
        obj = {
                method: method,
                url: url,
                data: qs.stringify(data),
                params: qs.stringify(data)
            }
    }

   

    if(!data){
        delete obj.data;
        delete obj.params;
    } else if(method === 'get'){
        delete obj.data
    } else {
        delete obj.params
    }
    
    return new Promise( (resolve,reject)=>{
        axios(obj)
        .then( res =>{

            if(res.status === 200){
                resolve(res);

            }
        })
        .catch( err =>{
            reject(err)
        })
    })
}

export {
    fetch
}
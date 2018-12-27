
/**
 * @param {mode}  
 * development
 * production 
 */
let Imgurl = '';
let ipUrl  = '';

if(process.env.NODE_ENV === 'development'){
   Imgurl = '';
   ipUrl  = 'http://tm.you1mei.com';
} else{
   Imgurl = '';
   ipUrl  = '';
}
 
export {
   Imgurl,
   ipUrl
}





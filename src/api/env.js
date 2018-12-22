
/**
 * @param {mode}  
 * development
 * production 
 */
let Imgurl = '';
let ipUrl  = '';

if(process.env.NODE_ENV === 'development'){
   Imgurl = 'https://you1mei.com/public/uploads/case/';
   ipUrl  = 'http://tm.you1mei.com';
} else{
   Imgurl = '/public/uploads/case/';
   ipUrl  = 'http://tm.you1mei.com';
}
 
export {
   Imgurl,
   ipUrl
}





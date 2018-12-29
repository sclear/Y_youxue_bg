// 1 使用 replace 方法  复制粘贴把所有的不需要的东西替换成'' 例如<?xml version="1.0" encoding="UTF-8"?><RecordInfo
// 2 定义所有其中的变量 否则使用eval方法会报错
// 3 split 以空格为目标 转换成数组
// 4 打印一下看看规律 我这里是这样的 实际不清楚 需要看看实际的
// 5 我这的数据是 以空格区分一排的数据  所以定义新数据newarr装所有数据  定义oldarr装临时数据 当遇到空格也就是不满足for中条件 会将临时数据push进newarr
     //最终可以用newarr的长度来判断 数据是哪些
// 6 try catch 语法必须存在 eval 语法出错就抛弃该数据 ( 出错原因是因为不是键值对 )


const zh = (res)=>{
    let camId;
    let count;
    let index;
    let sourceType;
    let recordType;
    let beginTime;
    let endTime;
    let length;
    let str = " camId='1000000$1$0$0' count='28' Record index='0' sourceType='3' recordType='7' beginTime='1545701587' endTime='1545703200' length='229376'  Record index='1' sourceType='3' recordType='7' beginTime='1545703200' endTime='1545705000' length='262144'  Record index='2' sourceType='3' recordType='7' beginTime='1545705000' endTime='1545706800' length='278528'  Record index='3' sourceType='3' recordType='7' beginTime='1545706800' endTime='1545708600' length='262144' "
    let arr = str.split(' ')
    let newarr = [];
    let oldarr = [];
    for(let i = 0;i < arr.length;i++){
        if(arr[i]){
            try{ oldarr.push(eval(arr[i])) }
            catch(err) {}
        } 
        else{
            newarr.push(oldarr)
            oldarr = [];
        }
    }
    console.log(newarr)
}

// export default zh




import Vue from 'vue'
export default new Vue();

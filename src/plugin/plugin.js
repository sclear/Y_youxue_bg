import { DIYtoast,toTime } from './../util/tool'

import { Imgurl } from './../api/env'
const plugin = {}

plugin.install = (Vue) => {


    Vue.prototype.$DIY=DIYtoast
    Vue.prototype.$url=Imgurl
     /**
     * use | _ymd
     * @param {number} val (tool中拥有判断 时间戳可10/13位)
     * 得到时间格式 y - m - d
     */
    Vue.filter('_ymd',val =>{
        if(val){
            return toTime(val,'y-m-d')
        } else return val
    })
    

    /**
     * use | _hm
     * @param {number} val (tool中拥有判断 时间戳可10/13位)
     * 得到时间格式 h : m
     */
    Vue.filter('_hm',val =>{
        if(val){
            return toTime(val,'h:m')
        } else return val
    })

     /**
     * use | isPay
     * @param {number} val 0否 1是
     * 判断是否购买
     */
    Vue.filter('isPay',val => val===1?'已支付':'未支付')
}
export default plugin

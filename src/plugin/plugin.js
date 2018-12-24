import { DIYtoast } from './../util/tool'

import { Imgurl } from './../api/env'
const plugin = {}

plugin.install = (Vue) => {


    Vue.prototype.$DIY=DIYtoast
    Vue.prototype.$url=Imgurl
    


}


export default plugin
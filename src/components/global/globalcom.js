
import sitmap from './sitmap.vue'
import model from './model.vue'


const _global = {}


_global.install = (Vue)=>{

    Vue.component('sitmap',sitmap)
    Vue.component('jModel',model)



}


export default _global
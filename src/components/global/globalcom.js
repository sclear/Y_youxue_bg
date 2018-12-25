
import sitmap from './sitmap.vue'
import model from './model.vue'
import editor from './editor.vue'


const _global = {}


_global.install = (Vue)=>{

    Vue.component('sitmap',sitmap)
    Vue.component('jModel',model)
    Vue.component('editor',editor)



}


export default _global
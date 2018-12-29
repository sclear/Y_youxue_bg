
import sitmap from './sitmap.vue'
import model from './model.vue'
import editor from './editor.vue'
import shade from './shade.vue'


const _global = {}


_global.install = (Vue)=>{

    Vue.component('sitmap',sitmap)
    Vue.component('jModel',model)
    Vue.component('editor',editor)
    Vue.component('shade',shade)



}


export default _global
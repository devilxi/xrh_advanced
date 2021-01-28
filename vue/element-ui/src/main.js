import Vue from 'vue'
import App from './App.vue'
import router from './router'
//1、正常引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);


//2、按需加载 npm i babel-plugin-component -D

//3、插件引用 vue add element


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

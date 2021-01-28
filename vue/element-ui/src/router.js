import Vue from 'vue';
import  Route from 'vue-router';
import Form from './components/Form';
import HelloWorld from './components/HelloWorld';

Vue.use(Route);
const routes = [
    {path:'/',component:Form},
    {path:'/form',component:Form},
    {path:'/hello',component:HelloWorld}
];
const router = new Route({
    routes
});

//全局路由守卫

/* eslint-disable*/
router.beforeEach((to,form,next)=>{
    console.log('beforeEach');
    next();
});

/* eslint-disable*/
router.beforeResolve((to,form,next)=>{
    console.log('beforeResolve');
    next();
});

/* eslint-disable*/
router.afterEach((to,form)=>{
    console.log('afterEach');
});



export default router;
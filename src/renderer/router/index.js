import Vue from 'vue';
import Router from 'vue-router';
import login from "@/pages/login.vue";
import adminIndex from "@/pages/adminIndex.vue";
import addStudent from "@/pages/addStudent.vue";
import studentList from "@/pages/studentList.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path:"/adminIndex",
      name:"adminIndex",
      component:adminIndex,
      children:[
        {
          path:"addStudent",
          name:"addStudent",
          component:addStudent
        },{
          path:"studentList",
          name:"studentList",
          component:studentList
        }
      ]
    }
  ]
})

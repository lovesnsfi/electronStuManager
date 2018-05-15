<template>
  <nav role="navigation" class=" navbar navbar-default navbar-fixed-top">
          <div class=" container-fluid">
              <div class=" navbar-header">
                  <a href="#" class=" navbar-brand">
                      学生管理系统
                  </a>
              </div>
             <ul class=" nav navbar-nav">
                 <li  class=" dropdown">
                     <a href="#" data-toggle="dropdown" class=" dropdown-toggle">
                        学生管理<span class=" caret"></span>
                     </a>
                     <ul class=" dropdown-menu">
                        <li><router-link :to="{name:'addStudent'}">新增学生</router-link></li>
                        <li><router-link :to="{name:'studentList'}">学生列表</router-link></li>
                     </ul>
                </li>
                 <li>
                     <a href="#">
                        班级管理<span class=" caret"></span>
                     </a>
                </li>
                 <li>
                     <a href="#">
                        专业管理<span class=" caret"></span>
                     </a>
                </li>
                 <li>
                     <a href="#">
                        系统管理<span class=" caret"></span>
                     </a>
                </li>
             </ul>
             <ul class=" nav navbar-nav navbar-right">
                 <li><a href="#">欢迎登陆：杨标</a></li>
                 <li><a href="javascript:void(0)" @click="logOut">退出系统</a></li>
             </ul>
          </div>
      </nav>
</template>

<script>
import electron from "electron";
export default {
    name:"navigatorBar",
    data(){
        return {

        }
    },
    methods:{
         logOut(){
            let dialog=electron.remote.dialog;
            let id= dialog.showMessageBox({
                title:"请确认",
                message:"您确定要退出系统吗？",
                buttons:["确定","取消"],
                defaultId:1
            });
            if(id==0){
                this.$router.push({name:"login"});
            }
        }
    }
}
</script>

<style>

</style>

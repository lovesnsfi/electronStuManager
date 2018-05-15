<template>
  <div class="login" @keydown.enter="loginSystem">
    <img src="../assets/bg.jpg" class="bgimg" alt="">
    <div class=" page-header" style="position:relative;z-index:10">
      <h2 class=" text-center text-primary">
        <img src="../assets/logo.png" alt="">
        
      </h2>
    </div>
    <div role="form" class=" loginBox">
      <h2 class=" text-center text-primary">学生管理系统</h2>
      <div class=" form-group">
        <div class=" input-group">
          <div class=" input-group-addon">
            <span class=" glyphicon glyphicon-user"></span>
          </div>
          <input type="text" class=" form-control" placeholder="请输入用户名" v-model="formData.UserName">
        </div>
      </div>
      <div class=" form-group">
        <div class=" input-group">
          <div class=" input-group-addon">
            <span class=" glyphicon glyphicon-lock"></span>
          </div>
          <input type="password" class=" form-control" placeholder="请输入密码" v-model="formData.UserPassWord">
        </div>
      </div>
      <div class=" form-group">
        <button class=" btn btn-primary btn-block" type="button" @click="loginSystem">登陆系统</button>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfoService from "../../services/UserInfoService.js";
import electron from "electron";
export default {
    name:"login",
    data(){
      return {
        formData:{
          UserName:"",
          UserPassWord:""
        }
      }
    },
    methods:{
      loginSystem(){
        let userInfoService=new UserInfoService();
        userInfoService.checkLogin(this.formData).then(result=>{
          if(result.length==1){
            let dialog=electron.remote.dialog;
            dialog.showMessageBox({
              title:"提示",
              message:"登陆成功",
              type:"info",
              buttons:["确定"]
            });
            this.$router.push({name:"adminIndex"});
          }
          else{
            let dialog=electron.remote.dialog;
            dialog.showMessageBox({
              title:"提示",
              message:"用户名或密码不正确",
              type:"warning",
              buttons:["确定"]
            });
          }
        }).catch(err=>{
          let dialog=electron.remote.dialog;
          dialog.showErrorBox("系统错误","数据库执行失败");
        });
      }
    }
}
</script>

<style lang="scss" scoped>
@mixin flexbox($dir:row){
  display: flex;
  flex-direction: $dir;
  @content;
}
  .login{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    >.bgimg
    {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    >.loginBox
    {
      width:350px;
      height: 250px;
      border:1px solid lightgray;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -175px;
      margin-top: -125px;
      box-sizing: border-box;
      padding: 10px;
      box-shadow: 0px 0px 30px lightseagreen;
      
    }
    .logoImg
    {
      width: 70px;
      height: 70px;
    }
  }
</style>

<template>
  <div class=" container addStudent">
      <!--新增学生 -->
    <div class=" page-header">
        <h2 class=" text-center text-primary">新增学生信息</h2>
    </div>
    <form role="form" class=" form-horizontal">
        <div class=" form-group">
            <label for="" class=" control-label col-sm-2">学生姓名</label>
            <div class=" col-sm-7">
                <input type="text" class=" form-control" placeholder="请输入学生姓名" v-model="formData.StuName">
            </div>
        </div>
        <div class=" form-group">
            <label for="" class=" control-label col-sm-2">学生性别</label>
            <div class=" col-sm-7">
                <select class=" form-control" v-model="formData.StuSex">
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </div>
        </div>
        <div class=" form-group">
            <label for="" class=" control-label col-sm-2">学生班级</label>
            <div class=" col-sm-7">
                <select class=" form-control" v-model="formData.ClassId">
                    <option v-for="(item,index) in classInfoList" :value="item.ClassId" :key="index">{{item.ClassName}}</option>
                </select>
            </div>
        </div>
        <div class=" form-group">
            <label for="" class=" control-label col-sm-2">学生民族</label>
            <div class=" col-sm-7">
                <select class=" form-control" v-model="formData.StuNation">
                    <option value="汉族">汉族</option>
                    <option value="满族">满族</option>
                    <option value="藏族">藏族</option>
                    <option value="回族">回族</option>
                    <option value="蒙古族">蒙古族</option>
                    <option value="其它">其它</option>
                </select>
            </div>
        </div>
        <div class=" form-group">
            <label for="" class=" control-label col-sm-2">联系方式</label>
            <div class=" col-sm-7">
                <input type="text" class=" form-control" placeholder="请输入联系方式" v-model="formData.StuConcat">
            </div>
        </div>
        <div class=" form-group">
            <label for="" class=" control-label col-sm-2">邮政编码</label>
            <div class=" col-sm-7">
                <input type="text" class=" form-control" placeholder="请输入邮政编码 " v-model="formData.StuPostCode">
            </div>
        </div>
        <div class=" form-group">
            <label for="" class=" control-label col-sm-2">政治面貌</label>
            <div class=" col-sm-7">
                <select class=" form-control" v-model="formData.StuPolitics">
                    <option value="团员">团员</option>
                    <option value="党员">党员</option>
                    <option value="群众">群众</option>
                    <option value="其它">其它</option>
                </select>
            </div>
        </div>
         <div class=" form-group" style="display:flex;align-items:center">
            <label for="" class=" control-label col-sm-2">学生图片</label>
            <div class=" col-sm-3">
                <button type="button" class=" btn btn-primary" @click="choosePic">
                    <span class=" glyphicon glyphicon-open-file"></span>选择图片
                </button>
            </div>
            <div class=" col-sm-3">
                <img src="" alt="" class=" img-responsive" ref="StuPhoto_img" style="max-width:110px">
            </div>
        </div>
        <div class=" form-group" >
            <label for="" class=" control-label col-sm-2">家庭地址</label>
            <div class=" col-sm-7">
               <textarea class=" form-control" placeholder="请输入家庭地址" v-model=" formData.StuFamilyAddress"></textarea>
            </div>
        </div>
       
        <div class=" form-group">
            <div class=" col-sm-7 col-sm-offset-2">
                <button class=" btn btn-primary" type="button" @click="saveData">保存信息</button>
                <button class=" btn btn-info" type="button">返回列表</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
import electron from "electron";
import fs from "fs";
import path from "path";
import ClassInfoService from "../../services/ClassInfoService.js";
import StudentInfoService from "../../services/StudentInfoService.js";
export default {
    name:"addStudent",
    data(){
        return {
            formData:{
                StuPhoto:"",
                ClassId:"",
                StuName:"",
                StuNation:"",
                StuConcat:"",
                StuPostCode:"",
                StuFamilyAddress:"",
                StuSex:"",
                StuPolitics:""
            },
            classInfoList:[]
        }
    },
    created(){
        let classInfoService=new ClassInfoService();
        classInfoService.getAllList().then(result=>{
            this.classInfoList=result;
        })
    },
    methods:{
        choosePic(){
            let dialog=electron.remote.dialog;
            dialog.showOpenDialog({
                title:"选择图片",
                filters:[
                    {name:"Images",extensions:['jpg', 'png', 'gif','bmp','jpeg']}
                ]
            },filenames=>{
                if(filenames!=undefined&&filenames.length==1){
                    let imgType=filenames[0].substr(filenames[0].lastIndexOf(".")+1);
                    var buff = fs.readFileSync(filenames[0]);
                    this.StuPhoto=buff;
                    this.$refs.StuPhoto_img.src=`data:${imgType};base64,${buff.toString("base64")}`;
                }
            })
        },
        saveData(){
            let studentInfoService=new StudentInfoService();
            studentInfoService.addStudent(this.formData).then(flag=>{
                if(flag){
                    let dialog=electron.remote.dialog;
                    dialog.showMessageBox({
                        title:"提示",
                        message:"添加成功",
                        buttons:["确定"]
                    });
                    this.$router.push({name:"studentList"});
                }
                else{
                    let dialog=electron.remote.dialog;
                    dialog.showErrorBox("提示","添加失败");
                }
            }).catch(err=>{
                let dialog=electron.remote.dialog;
                dialog.showErrorBox("提示","添加失败，数据库执行错误");
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

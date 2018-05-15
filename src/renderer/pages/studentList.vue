<template>
  <div class=" container studentList">
      <div class=" page-header">
          <h2 class=" text-center text-primary">学生信息列表</h2>
      </div>
      <form role="form" class=" form-inline text-center">
          <div class=" form-group">
              <label for="" class=" control-label">姓名</label>
              <input placeholder="请输入学生姓名" type="text" class=" form-control" v-model="formData.StuName">
          </div>
          <div class=" form-group">
              <label for="" class=" control-label">性别</label>
              <select class=" form-control" v-model="formData.StuSex">
                  <option value="">-请选择-</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
              </select>
          </div>
          <div class=" form-group">
              <label for="" class=" control-label">班级</label>
              <select class=" form-control" v-model="formData.ClassId">
                  <option value="">-请选择-</option>
                  <option v-for="(item,index) in classInfoList" :value="item.ClassId" :key="index">{{item.ClassName}}</option>
              </select>
          </div>
          <div class=" form-group">
              <button type="button" class=" btn btn-primary" @click="queryData">
                  <span class=" glyphicon glyphicon-search"></span>查询
              </button>
          </div>
      </form>
      <div class=" btn-group" style="margin:5px 0">
          <button class=" btn btn-primary" type="button" @click="$router.push({name:'addStudent'})">
              <span class=" glyphicon glyphicon-plus"></span>新增
          </button>
          <button class=" btn btn-warning" type="button">
              <span class=" glyphicon glyphicon-pencil"></span>编辑
          </button>
          <button class=" btn btn-danger" type="button">
              <span class=" glyphicon glyphicon-remove-circle"></span>删除
          </button>
      </div>
      <div class=" table-responsive">
         <table class=" table table-hover table-striped">
             <thead>
                 <tr>
                     <th>姓名</th>
                     <th>性别</th>
                     <th>班级</th>
                     <th>民族</th>
                     <th>联系方式</th>
                     <th>政治面貌</th>
                     <th>家庭住址</th>
                 </tr>
             </thead>
             <tbody>
                 <tr v-for="(item,index) in studentInfoList" :key="index">
                     <th>{{item.StuName}}</th>
                     <th>{{item.StuSex}}</th>
                     <th>{{item.ClassId}}</th>
                     <th>{{item.StuNation}}</th>
                     <th>{{item.StuConcat}}</th>
                     <th>{{item.StuPolitics}}</th>
                     <th>{{item.StuFamilyAddress}}</th>
                 </tr>
             </tbody>
         </table>
      </div>
      <ul class=" pagination pull-right">
          <li :class="{active:item==formData.pageIndex}" v-for="(item,index) in pageCount" :key="index">
              <a href="#">{{item}}</a>
            </li>
      </ul>
  </div>
</template>

<script>
import ClassInfoService from "../../services/ClassInfoService.js";
import StudentInfoService from "../../services/StudentInfoService.js";
import electron from "electron";
export default {
  name: "addStudent",
  data() {
    return {
      classInfoList: [],
      formData: {
        pageIndex: 1,
        StuName: "",
        ClassId: "",
        StuSex: ""
      },
      studentInfoList:[],
      pageCount:0
    };
  },
  created() {
    let classInfoService = new ClassInfoService();
    let studentInfoService =new StudentInfoService();
    Promise.all([classInfoService.getAllList(),studentInfoService.getListByPage(this.formData)]).then(results=>{
        this.classInfoList = results[0];
        this.studentInfoList=results[1].listData;
        this.pageCount=results[1].pageCount;
   });
  },
  methods:{
      queryData(){
          this.formData.pageIndex=1;
          let studentInfoService=new StudentInfoService();
          studentInfoService.getListByPage(this.formData).then(result=>{
              this.studentInfoList=result.listData;
              this.pageCount=result.pageCount;
          }).catch(err=>{
              let dialog=electron.remote.dialog;
              dialog.showErrorBox("错误","数据库错误");
          })
      }
  }
};
</script>

<style lang="scss" scoped>

</style>

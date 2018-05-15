import {isNullOrUndefined} from "../utils/ObjectHelper";
import PageList from "../model/PageList";
import DBUtil from "../utils/DBUtil";
export default class StudentInfoService{
    /**
     * 分页获取用户数据
     * @param {pageIndex,StuName,ClassId,StuSex} param0 
     */
    getListByPage({pageIndex,StuName,ClassId,StuSex}){
        return new Promise((resolve,reject)=>{
            let conn=DBUtil.getConn();
            let strSql="select * from tbStudentInfo where isDel=false ";
            let strCountSql="select count(*) as sumCount from tbStudentInfo where isDel=false ";
            let strWhere="";
            if(!isNullOrUndefined(StuName)){
                strWhere+=" and StuName like '%"+StuName+"%'";
            }
            if(!isNullOrUndefined(StuSex)){
                strWhere+=" and StuSex='"+StuSex+"'";
            }
            if(!isNullOrUndefined(ClassId)){
                strWhere+=" and ClassId='"+ClassId+"'";
            }
            strSql+=strWhere +"limit ?,?";
            strCountSql+=strWhere;
            conn.query(strSql+";"+strCountSql,[(pageIndex-1)*10,10],(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(new PageList(result[1][0].sumCount,pageIndex,result[0]));
                }
                conn.end();
            });
        })
    }
    /**
     * 添加学生信息
     * @param {ClassId,StuName,StuSex,StuNation,StuFamilyAddress,StuConcat,StuPhoto,StuPostCode,StuPolitics} param0 
     */
    addStudent({ClassId,StuName,StuSex,StuNation,StuFamilyAddress,StuConcat,StuPhoto,StuPostCode,StuPolitics}){
       return new Promise((resolve,reject)=>{
            var conn=DBUtil.getConn();
            var strSql="insert into tbStudentInfo (ClassId,StuName,StuSex,StuNation,StuFamilyAddress,StuConcat,StuPhoto,StuPostCode,StuPolitics) values (?,?,?,?,?,?,?,?,?) ";
            conn.query(strSql,[ClassId,StuName,StuSex,StuNation,StuFamilyAddress,StuConcat,StuPhoto,StuPostCode,StuPolitics],(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result.affectedRows>0?true:false);
                }
                conn.end();
            })
       })
    }
}
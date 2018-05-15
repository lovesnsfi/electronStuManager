import DBUtil from "../utils/DBUtil";
import {isNullOrUndefined} from "../utils/ObjectHelper";
import PageList from "../model/PageList";
export default class UserInfoService{
    constructor(){

    }

    /**
     * @name 检测登陆
     * @param {UserName,UserPassWord} param0  用户名与密码 
     */
    checkLogin({UserName,UserPassWord}){
        return new Promise((resolve,reject)=>{
            let conn=DBUtil.getConn();
            conn.query("select * from tbUserInfo where isDel=false and UserName=? and UserPassWord=? ",[UserName,UserPassWord],(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    }

    
}
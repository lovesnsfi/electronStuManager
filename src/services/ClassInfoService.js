import DBUtil from "../utils/DBUtil";   
export default class ClassInfoService{
    /**
     * 获取所有班级的信息 
     */
    getAllList(){
        return new Promise((resolve,reject)=>{
            let conn=DBUtil.getConn();
            conn.query("select * from tbClassInfo where isDel=false",[],(err,result)=>{
                if(err){
                    reject(err);
                }               
                else{
                    resolve(result);
                } 
                conn.end();
            });
        })
    }
}
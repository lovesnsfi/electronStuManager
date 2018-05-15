import mysql from "mysql";

/**
 * 数据库连接工具类
 */
export default class DBUtil{
    static getConn(){
       let conn=mysql.createConnection({
           host:"127.0.0.1",
           user:"root",
           password:"123456",
           database:"studentDB",
           multipleStatements:true
       });
       conn.connect();
       return conn;
    }
}
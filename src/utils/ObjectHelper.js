export function isNullOrUndefined(value){
    if(value!=null&&value!=undefined&&value!=""){
        return false;
    }
    else{
        return true;
    }
}
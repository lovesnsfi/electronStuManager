export default class PageList{
    /**
     * 页面分页数据
     * @param {Number} sumCount 
     * @param {Number} pageIndex 
     * @param {Array} listData 
     */
    constructor(sumCount,pageIndex,listData){
        this.sumCount=sumCount;
        this.pageIndex=pageIndex;
        this.pageCount=Math.ceil(this.sumCount/10);
        this.listData=listData||[]
    }
}
export default class StockModel {
    constructor(product_id, count){
        this.product_id = String(product_id);
        this.count = Number(count);
        if(Number.isNaN(this.count) || !product_id || !count){
            throw new Error();
        }
    }
}

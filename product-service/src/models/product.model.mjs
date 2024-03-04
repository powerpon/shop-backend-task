export default class ProductModel {
    constructor(id, description, price, title){
        this.id = String(id);
        this.description = String(description);
        this.price = Number(price);
        this.title = String(title);
        if(Number.isNaN(this.price) || !id || !description || !price || !title){
            throw new Error('Invalid Property Value Passed For Product');
        }
    }
}

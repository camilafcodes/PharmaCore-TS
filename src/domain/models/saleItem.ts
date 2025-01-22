export class SaleItem {
    id_item?: number;
    id_sale: number;
    id_medicine: number;
    quantity: number;
    total_cost_item?: number;


    constructor(infoSaleItem:

        {
            id_item?: number;
            id_sale: number;
            id_medicine: number;
            quantity: number;
            total_cost_item?: number;
        }) {
        this.id_item = infoSaleItem.id_item;
        this.id_sale = infoSaleItem.id_sale;
        this.id_medicine = infoSaleItem.id_medicine;
        this.quantity = infoSaleItem.quantity;
        this.total_cost_item = infoSaleItem.total_cost_item;
    }
}
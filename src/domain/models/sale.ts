
import { SaleItem } from "./saleItem";

export class Sale {
    id_sale?: number | null;
    id_patient: string;
    date_time: Date;
    sale_total_cost?: number;
    items: Array<SaleItem>

    constructor(infoSale:

        {
            id_sale?: number
            id_patient: string,
            date_time: Date,
            sale_total_cost?: number;
            items: Array<SaleItem>
        }) {
        this.id_sale = infoSale.id_sale
        this.id_patient = infoSale.id_patient
        this.date_time = infoSale.date_time
        this.sale_total_cost = infoSale.sale_total_cost
        this.items = infoSale.items

    }

}
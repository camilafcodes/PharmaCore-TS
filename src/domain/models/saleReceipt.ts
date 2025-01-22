import { SaleItemReceipt } from "../saleItemReceipt";


export interface SaleReceipt {

    id_sale: number | null;
    id_patient: string;
    date_time: Date;
    sale_total_cost: number;
    items: Array<SaleItemReceipt>
}
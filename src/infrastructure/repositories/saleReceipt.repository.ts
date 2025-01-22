import { FieldPacket, RowDataPacket } from "mysql2";
import { SaleReceipt } from "../../domain/models/saleReceipt";
import { getPoolConnection } from "./config/data.source";

export class SaleReceiptRepository {


    async createReceipt(id: number): Promise<SaleReceipt> {
        const connection = getPoolConnection();
        const querySql: string = `SELECT s.id_sale, s.id_patient, s.date_time, s.sale_total_cost, 
        si.quantity, si.total_cost_item, m.name_medicine, m.unit_cost FROM sales s LEFT JOIN sale_items si ON s.id_sale = si.id_sale
        LEFT JOIN medicines m ON si.id_medicine = m.id_medicine WHERE s.id_sale = ?;`;

        const values = [id];
        const [result]: [RowDataPacket[], FieldPacket[]] = await connection.query(querySql, values);

        if (result.length === 0) {
            throw new Error(`No se encontró la venta con id_sale = ${id}`);
        }

        const sale: SaleReceipt = {
            id_sale: result[0].id_sale,
            id_patient: result[0].id_patient,
            date_time: result[0].date_time,
            sale_total_cost: result[0].sale_total_cost,
            items: result.map(row => ({
                name_medicine: row.name_medicine,
                quantity: row.quantity,
                unit_cost: row.unit_cost,
                total_cost_item: row.total_cost_item
            }))
        }

        return sale
    }
}